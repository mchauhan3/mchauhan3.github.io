---
title: Building a Simple ORM for SlateDB in Go
date: "2025-09-18"
description: "A design exploration of schema management, serialization formats, and secondary index support for a developer-friendly wrapper around SlateDB."
---

Over the past few weeks, I’ve been experimenting with [**slatedb**](https://slatedb.io/), mainly to evaluate its potential as a durable cache. In the process, I ended up writing [Go bindings](https://github.com/slatedb/slatedb/tree/main/slatedb-go), which were later merged into the project itself—a fun way to get my hands dirty with the internals. These explorations got me thinking: while slatedb provides a solid foundation, many common application patterns could benefit from a higher-level abstraction. That line of thought naturally led me to sketch out what an [Object-Relational Mapping](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) (ORM) layer on top of slatedb might look like.

## What is SlateDB?

**SlateDB** is an embedded storage engine that writes its data directly to object storage instead of local disk. This design gives it bottomless capacity, strong durability, and simple replication while still being lightweight and embeddable in your application.

Here’s an example of typical usage:

```go
db, _ := slatedb.Open("/tmp/cache", &slatedb.StoreConfig{
    Provider: slatedb.ProviderAWS,
    AWS: &slatedb.AWSConfig{
        Bucket: "bucket",
        Region: "us-west-2",
    },
})
defer db.Close()

db.Put([]byte("key"), []byte("value"))
value, _ := db.Get([]byte("key"))
```

## The Gap: From Bytes to Objects

As you might have noticed from the example, slatedb is a bytes-in, bytes-out key-value store. While simple and powerful, working directly with byte arrays isn't always the most developer-friendly approach. Let's explore some higher-level abstractions we could build on top of it to make it more ergonomic for everyday use:

- **Object-Relational Mapping**: Instead of working with raw bytes, we could implement ORM support that maps Go structs directly to database entries, handling serialization and de-serialization automatically.
- **Secondary indexes**: Implement the ability to query data by fields other than the primary key, similar to how traditional ORMs provide this functionality.

## The Bridge: A Lightweight ORM

Let’s sketch out what a simple ORM layer might look like. Broadly, the idea is to build a lightweight wrapper on top of SlateDB that gives developers a more natural way to work with domain objects rather than raw key/value pairs. At the core, this wrapper would support three essential operations:

- **Insert Object** – take a Go struct, serialize it, and persist it in SlateDB using a primary key. This makes writes feel more like saving a record than setting a key.
- **Get by Primary Key** – fetch a single object back from the store by its primary key and hydrate it into a Go struct. This aligns with the familiar “find by ID” pattern in most ORMs.
- **List by Field** – allow querying across objects by a secondary field.

The goal isn’t to recreate the complexity of a full-featured ORM like [GORM](https://gorm.io/) or [Hibernate](https://hibernate.org/orm/), but to provide just enough abstraction that working with SlateDB feels intuitive in application code.

## Schema Management and Serialization

You probably guessed it. We will need schemas! A schema is a description of the data’s format and structure. In building a high-performance database wrapper, the choice of serialization format is critical as it directly impacts storage efficiency, speed, and maintainability. We have a few options for the format:

- [**Apache Avro**](https://avro.apache.org/): A strong option that uses a JSON schema and offers powerful, dynamic schema resolution. This flexibility allows it to handle schema evolution seamlessly at runtime.
- [**Protocol Buffers (Protobuf)**](https://protobuf.dev/): This is an excellent choice for a high-performance database wrapper. Its binary format is highly compact and fast, and it provides compile-time type safety through code generation from `.proto` schema files.
- [**JSON**](https://www.json.org/json-en.html): The most human-readable format, which is great for debugging. However, it's text-based and verbose, leading to larger data sizes and slower performance compared to binary formats like Protobuf and Avro.

We will stick with either Avro or Protobuf for our implementation.

### **Storing Schemas in SlateDB**

To ensure our system is self-contained and portable, we'll store all schema definitions directly within SlateDB. We'll use a reserved key prefix to keep them separate from user data, creating a dedicated "metadata" space.

- **Key Naming**: We'll use a prefix like `__schema__` followed by the model name, for example, `__schema__user` or `__schema__product`.
- **Value Format**: The value will be the raw text of the schema itself—either the `.proto` file content or the Avro JSON schema.

This approach means we can move our entire SlateDB instance to a new environment, and all the necessary structural information comes with it, ready to go.

### **Caching Schemas**

While it's great to have schemas stored in the database, we can't afford a lookup every time we need to serialize or deserialize data. The solution is a simple, effective in-memory cache.

When our wrapper needs a schema for the first time, it will read it from SlateDB, parse it into an in-memory representation, and then store it in a cache. All subsequent calls will hit the cache directly, bypassing the database entirely.

### **The Ser/Deser Flow in Action**


**Serialization (Writing Data)**

1. **Input**: A developer calls `insert(user_object)`.
2. **Schema Retrieval**: The wrapper's `insert` method automatically identifies the model type (`user`) and retrieves the correct schema from our in-memory cache. If it's not in the cache, it's fetched from the database and loaded.
3. **Data Serialization**: Using this schema as a guide, the wrapper's engine converts the `user_object` into a compact binary format.
4. **Storage**: The highly efficient binary data is then written to SlateDB under the specified key.

**Deserialization (Reading Data)**

1. **Input**: A developer calls `get("key")`.
2. **Schema Retrieval**: The wrapper reads the binary data, and based on the key (e.g., `user:<id>`), it pulls the `user` schema from the cache.
3. **Data Deserialization**: The wrapper uses the retrieved schema to correctly parse the binary data, deserializing the data into a structured `user_object`.
4. **Output**: The user gets a ready-to-use object, with all the properties and types they expect.

## Secondary Index Support

Once we can reliably store and retrieve typed objects, the next big step is enabling richer queries. Developers rarely want just “get by ID”; they need to fetch users by email, orders by date, or sessions by status. That’s where secondary indexes come in. Our wrapper will add **secondary indexes** to enable efficient queries on non-primary-key fields. We will use a composite key strategy to ensure data consistency.

### **The Composite Key Strategy**

We will create a unique key for each secondary index entry, embedding the indexed value and the primary key ID. This approach avoids race conditions and complex locking.

- **Key Naming Convention**: `idx:<model>:<field>:<value>:<primary_key_id>`
- **Secondary Index Value**: A simple placeholder is used to save storage.

### **Updates and Deletes**

This design ensures consistency, even with concurrent operations.

- **Writing Data**: A `put` operation is performed for both the primary key and each secondary index key, within an atomic batch.
- **Updating an Indexed Field**: This requires an atomic **delete-and-put** operation. The old index key is deleted, and a new one is created with the updated value.
- **Deleting a Record**: The primary key and all associated secondary index keys are removed in an atomic batch.

### **Querying with Secondary Indexes**

Reading data from a secondary index involves two steps:

1. **Prefix Scan**: The wrapper performs a prefix scan on the secondary index to retrieve all matching primary keys.
2. **Primary Key Lookups**: It then performs a `get` operation for each primary key to retrieve the full record.

For read-heavy workloads, a [**covering index**](https://en.wikipedia.org/wiki/Database_index#Covering_index) could be used, where the full serialized record is stored in the secondary index value. This eliminates the second lookup but increases storage costs and write complexity. The composite key with a placeholder is a more balanced choice for a general-purpose wrapper.

## Conclusion and Next Steps

We’ve walked through the foundations of an ORM layer on top of SlateDB: defining and storing schemas, choosing efficient serialization formats, and designing secondary indexes for richer queries. Together, these pieces outline a path toward making SlateDB more ergonomic for everyday application development, moving beyond raw byte arrays to structured, queryable objects.

The next step is the fun part: **implementing the library**. That means writing the wrapper, testing schema storage and retrieval, validating serialization choices, and stress-testing secondary index behavior under concurrent workloads.

SlateDB’s object-storage-first design already gives it durability and scalability. Adding an ORM layer on top opens the door to treating it as a lightweight persistence layer that feels natural to use in Go applications.

I’ll be sharing updates as the implementation takes shape—stay tuned!

This is also my first blog post, so if you made it this far — thanks for reading, I’m looking forward to writing more!
