#set document(title: "Mohit Chauhan Resume")
#set page(
  paper: "us-letter",
  margin: (x: 0.48in, y: 0.42in),
)

#let body-font = "Linux Libertine"
#let ui-font = "Fira Sans"
#let accent = rgb("#0f4c81")
#let accent-soft = rgb("#2b6a9a")
#let muted = rgb("#5b6470")
#let rule = luma(205)

#set text(
  font: body-font,
  size: 8.55pt,
  lang: "en",
)
#set par(justify: false, leading: 0.34em)

#let divider() = line(length: 100%, stroke: 0.6pt + rule)

#let section(title) = [
  #v(0.46em)
  #grid(
    columns: (auto, 1fr),
    column-gutter: 0.45em,
    [
      #box(width: 0.11in, height: 0.11in, fill: accent, radius: 0.02in)
    ],
    [
      #text(
        font: ui-font,
        size: 9.05pt,
        weight: 800,
        tracking: 0.09em,
        fill: accent,
      )[ #upper(title) ]
    ],
  )
  #v(0.08em)
  #divider()
  #v(0.14em)
]

#let header-link(body) = text(fill: accent)[#body]

#let entry(title, company, detail, location, dates, bullets) = [
  #grid(
    columns: (1fr, auto),
    column-gutter: 0.8em,
    [
      #text(font: ui-font, weight: 700, size: 8.95pt)[#title]
      #if company != "" [
        #text(font: ui-font, weight: 700, size: 8.35pt, fill: accent)[#company]
      ]
      #if detail != "" [
        #text(fill: muted, size: 8.15pt, style: "italic")[#detail]
      ]
    ],
    [
      #align(right)[
        #text(font: ui-font, weight: 700, size: 8.45pt, fill: accent-soft)[#dates]
        #linebreak()
        #text(fill: muted, size: 8.0pt)[#location]
      ]
    ],
  )
  #v(0.03em)
  #set list(marker: [•], indent: 1.02em, body-indent: 0.38em, spacing: 0.1em)
  #bullets
  #v(0.12em)
]

#let skill-line(label, body) = [
  #text(font: ui-font, weight: 700)[#label:]
  #h(0.25em)
  #body
  #parbreak()
]

#align(center)[
  #text(font: ui-font, size: 18.5pt, weight: 800, tracking: 0.02em)[Mohit Chauhan]
  #v(0.14em)
  #grid(
    columns: (auto, auto, auto),
    column-gutter: 0.9em,
    align(center)[#text(fill: muted, size: 8.5pt)[Vancouver, BC]],
    align(center)[#text(fill: muted, size: 8.5pt)[mhchauhan3\@gmail.com]],
    align(center)[#text(fill: muted, size: 8.5pt)[+1-778-636-3270]],
  )
  #v(0.02em)
  #text(fill: muted, size: 8.4pt)[
    #header-link([linkedin.com/in/mohit-chauhan])
    #h(0.7em)•#h(0.7em)
    #header-link([github.com/mchauhan3])
  ]
]

#section[Work Experience]

#entry(
  "Senior Software Engineer II",
  "Confluent",
  "Control Plane - Metadata Storage",
  "Vancouver, BC",
  "June 2024 - Present",
  [
    - Developed and operated control plane metadata storage services across AWS, Azure, and GCP, providing cloud-agnostic CRUDL and Watch APIs that power critical Confluent Cloud operations.
    - Led the design and implementation of multiple Distribution Service components, enabling products including Schema Registry and Kora to access cross-region metadata with in-region performance characteristics.
    - Redesigned Azure List and Watch behavior on Cosmos DB, improving latency by 15x and reducing consumed capacity by 8x, with annual cost savings above \$400,000.
    - Experimented with a durable cache backed by SlateDB to enable scalable reads, created open-source Go bindings, and contributed upstream.
    - Led development of a SQLite-backed caching layer for scalable Watch snapshots and cloud-agnostic secondary indexes.
  ],
)

#entry(
  "Software Development Engineer II",
  "Amazon",
  "Marketplace Tax and Accounting Team",
  "Vancouver, BC",
  "September 2022 - June 2024",
  [
    - Developed and operated multiple microservices in Amazon Retail accounting and tax workflows, handling loads up to 2,000 TPS.
    - Eliminated \$503MM in accounting errors by designing a generic seller-classification fix and deploying it globally across services and regions.
    - Led extraction of a key component from another team's service into a standalone service, cutting development delays by roughly 80 percent while removing significant tech debt.
    - Built an asynchronous verification path to validate new services before migration without affecting existing production performance.
    - Developed a chatbot MVP with Amazon Lex that reduced turnaround from one to two weeks down to one day for half of customer-associate inquiries.
  ],
)

#entry(
  "Software Development Engineer I/II",
  "Amazon",
  "Alexa AI Dynamic Routing",
  "Seattle, WA",
  "May 2020 - September 2022",
  [
    - Developed and operated a highly available, low-latency service in the Alexa request path, serving up to 13,000 TPS and routing requests to partner services.
    - Expanded rule-engine expressivity without degrading performance, giving partner teams more precise traffic-filtering controls and improving routing accuracy.
    - Designed and developed instrumentation to verify correctness and measure performance during migration to a new ReactiveX-based architecture.
  ],
)

#entry(
  "Full Stack / Quantitative Developer",
  "Lucena (Neuravest) Research",
  "",
  "Atlanta, GA",
  "March 2019 - May 2020",
  [
    - Deployed a containerized integration with Interactive Brokers, enabling clients to move proprietary strategies into live trading.
    - Designed market-beating strategies for multiple data providers using statistical and AI techniques to demonstrate the value of supplied data.
    - Developed ETL pipelines for client datasets and public market data from Bloomberg and Refinitiv.
    - Developed and operated the core backtesting framework and client-facing web application.
  ],
)

#entry(
  "Software Developer Intern",
  "Elavon, US Bank",
  "",
  "Atlanta, GA",
  "Summer 2018",
  [
    - Administered organization-wide DevOps tooling including Jenkins, TestRail, Jira, and BitBucket.
    - Improved test coverage for the external-facing Commerce SDK.
  ],
)

#entry(
  "Software Developer Intern",
  "IBM Security",
  "",
  "Atlanta, GA",
  "Summer 2017",
  [
    - Developed a real-time interactive visualization application in Unity3D for threat and asset management with IBM QRadar SIEM.
    - Built a VR application to help individuals with Autism Spectrum Disorder better understand facial and verbal cues; the project won IBM's national intern hackathon.
  ],
)

#entry(
  "Teaching Assistant, Objects and Design",
  "Georgia Tech",
  "",
  "Atlanta, GA",
  "2017 - 2018",
  [
    - Instructed students on object-oriented programming and software engineering practices including testing, project management, and debugging.
    - Mentored teams through semester-long Android application projects.
  ],
)

#entry(
  "Research Assistant, HCI",
  "Georgia Tech",
  "",
  "Atlanta, GA",
  "2016 - 2017",
  [
    - Developed a Chrome extension and Android app to test and launch a novel password-creation and management strategy.
    - Created instructional material for applying the strategy with the developed tools.
  ],
)

#section[Education]

#grid(
  columns: (1fr, auto),
  column-gutter: 0.8em,
  [
    #text(font: ui-font, weight: 700, size: 8.95pt)[B.Sc. Computer Science, Georgia Institute of Technology]
    #linebreak()
    Concentration in Intelligence and Information Internetworks
    #linebreak()
    GPA: 3.82 / 4.0
  ],
  [
    #align(right)[
      #text(font: ui-font, weight: 700)[2015 - 2018]
    ]
  ],
)

#section[Technologies and Languages]

#skill-line(
  "Languages",
  [Golang, Java, Python, Kotlin, JavaScript, Shell, Matlab],
)
#skill-line(
  "Technologies",
  [Claude Code, AWS, Azure, GCP, Terraform, Kafka, SemaphoreCI, Spring, Guice, Git, Dask, SQL, Pandas, Airflow, Scikit-learn, React, Backbone.js, Docker, Kubernetes, Unity3D],
)
#skill-line(
  "Other",
  [Data structures and algorithms, distributed systems, feature engineering],
)
