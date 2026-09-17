#set document(title: "Mohit Chauhan Resume")
#set page(
  paper: "us-letter",
  margin: (x: 0.48in, y: 0.42in),
)

#let body-font = "Noto Sans"
#let ui-font = "Fira Sans"
#let accent = rgb("#0f4c81")
#let accent-soft = rgb("#2b6a9a")
#let muted = rgb("#5b6470")
#let rule = luma(205)

#set text(
  font: body-font,
  size: 8.3pt,
  lang: "en",
)
#set par(justify: false, leading: 0.3em)

#let divider() = line(length: 100%, stroke: 0.6pt + rule)

#let section(title) = [
  #v(0.38em)
  #text(
    font: ui-font,
    size: 8.7pt,
    weight: 700,
    tracking: 0.1em,
    fill: accent,
  )[ #upper(title) ]
  #v(0.07em)
  #divider()
  #v(0.14em)
]

#let header-link(body) = text(fill: accent)[#body]

#let subline(company, detail) = [
  #if company != "" [
    #text(font: ui-font, weight: 700, size: 8.1pt, fill: accent)[#company]
  ]
  #if company != "" and detail != "" [
    #h(0.3em)
    #text(fill: muted, size: 8.0pt)[|]
    #h(0.3em)
  ]
  #if detail != "" [
    #text(font: ui-font, weight: 500, size: 8.0pt, fill: muted)[#detail]
  ]
]

#let entry(title, company, detail, location, dates, bullets) = [
  #grid(
    columns: (1fr, auto),
    column-gutter: 0.8em,
    [
      #text(font: ui-font, weight: 700, size: 8.95pt)[#title]
      #if company != "" or detail != "" [
        #linebreak()
        #subline(company, detail)
      ]
    ],
    [
      #align(right)[
        #text(font: ui-font, weight: 700, size: 8.35pt, fill: accent-soft)[#dates]
        #linebreak()
        #text(fill: muted, size: 8.0pt)[#location]
      ]
    ],
  )
  #v(0.08em)
  #set list(marker: [•], indent: 1.02em, body-indent: 0.38em, spacing: 0.09em)
  #bullets
  #v(0.13em)
]

#let skill-line(label, body) = [
  #text(font: ui-font, weight: 700)[#label:]
  #h(0.25em)
  #body
  #parbreak()
]

#let grouped-entry(title, org, location, dates, body) = [
  #grid(
    columns: (1fr, auto),
    column-gutter: 0.8em,
    [
      #text(font: ui-font, weight: 700, size: 8.95pt)[#title]
      #if org != "" [
        #linebreak()
        #text(font: ui-font, weight: 700, size: 8.1pt, fill: accent)[#org]
      ]
    ],
    [
      #align(right)[
        #if dates != "" [
          #text(font: ui-font, weight: 700, size: 8.45pt, fill: accent-soft)[#dates]
          #linebreak()
        ]
        #text(fill: muted, size: 8.0pt)[#location]
      ]
    ],
  )
  #v(0.07em)
  #body
  #v(0.13em)
]

#let education-entry(degree, school, location, dates, detail, gpa) = [
  #grid(
    columns: (1fr, auto),
    column-gutter: 0.8em,
    [
      #text(font: ui-font, weight: 700, size: 8.95pt)[#degree]
      #linebreak()
      #text(font: ui-font, weight: 700, size: 8.1pt, fill: accent)[#school]
      #linebreak()
      #text(font: ui-font, weight: 500, size: 8.0pt, fill: muted)[#detail]
      #linebreak()
      #text(size: 8.15pt)[#gpa]
    ],
    [
      #align(right)[
        #text(font: ui-font, weight: 700, size: 8.35pt, fill: accent-soft)[#dates]
        #linebreak()
        #text(fill: muted, size: 8.0pt)[#location]
      ]
    ],
  )
]

#align(center)[
  #text(font: ui-font, size: 18.5pt, weight: 800, tracking: 0.02em)[Mohit Chauhan]
  #v(0.16em)
  #grid(
    columns: (auto, auto, auto),
    column-gutter: 0.9em,
    align(center)[#text(fill: muted, size: 8.55pt)[Vancouver, BC]],
    align(center)[#text(fill: muted, size: 8.55pt)[mhchauhan3\@gmail.com]],
    align(center)[#text(fill: muted, size: 8.55pt)[+1-778-636-3270]],
  )
  #v(0.04em)
  #text(fill: muted, size: 8.4pt)[
    #header-link([linkedin.com/in/mohit-chauhan])
    #h(0.7em)•#h(0.7em)
    #header-link([github.com/mchauhan3])
  ]
]

#section[Work Experience]

#entry(
  "Member of Technical Staff",
  "P-1 AI",
  "Platform Engineering",
  "Vancouver, BC",
  "May 2026 - Present",
  [
    - Built P-1's #strong[bring-your-own-cloud Kubernetes platform from scratch], reaching customer production in #strong[three months]. Developed the Go/Kubebuilder operator and composable Helm system that deploys the full product from a single declarative specification.
    - Enabled enterprises to run P-1 entirely within their own VPC and compliance boundary, including #strong[air-gapped environments], while keeping internal and customer installations on one deployment path.
    - Owned production deployment and release operations across P-1's customer fleet. Built #strong[GitOps reconciliation, pinned release promotion, and centralized observability] to prevent drift and diagnose failures without direct cluster access.
  ],
)

#entry(
  "Senior Software Engineer II",
  "Confluent",
  "Control Plane - Metadata Storage",
  "Vancouver, BC",
  "June 2024 - May 2026",
  [
    - Led #strong[Watch (CDC) scalability] for Confluent's multi-cloud resource management platform across #strong[AWS, Azure, and GCP], spanning storage, caching, APIs, and production operations.
    - Architected and shipped a pod-local caching system using #strong[SQLite] and #strong[Kafka CDC], reducing #strong[p99 Watch API latency] by about #strong[80 percent]#text[;] evaluated SlateDB as an alternative and contributed open-source Go bindings.
    - Built a #strong[multi-region replication layer] for global and regional resources, enabling in-region access characteristics and stronger disaster recovery.
    - Redesigned List and Watch behavior on Azure Cosmos DB, improving latency by #strong[15x], reducing consumed capacity by #strong[8x], and driving more than #strong[\$400,000] in annual savings.
    - Decoupled a core platform component into an independent #strong[gRPC service], enabling independent deployment, scaling, and clearer ownership boundaries.
    - Established production observability through #strong[dashboards, alerts, and runbooks], and supported incident response as part of the on-call rotation.
  ],
)

#entry(
  "Software Development Engineer II",
  "Amazon",
  "Marketplace Tax and Accounting Team",
  "Vancouver, BC",
  "September 2022 - June 2024",
  [
    - Built and operated microservices in Amazon Retail accounting and tax workflows, serving up to #strong[2,000 TPS].
    - Eliminated #strong[\$503MM] in accounting errors by designing a generic seller-classification fix and deploying it globally across services and regions.
    - Led extraction of a key component from another team's service into a standalone service, cutting development delays by roughly #strong[80 percent] while removing significant tech debt.
    - Built an asynchronous verification path to validate new services pre-migration without impacting production performance.
  ],
)

#entry(
  "Software Development Engineer I/II",
  "Amazon",
  "Alexa AI Dynamic Routing",
  "Seattle, WA",
  "May 2020 - September 2022",
  [
    - Developed and operated a highly available, low-latency service in the Alexa request path, serving up to #strong[13,000 TPS] and routing requests to partner services.
    - Expanded the rule engine's expressivity without degrading performance, giving partner teams finer-grained traffic controls and improving routing accuracy.
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
    - Deployed a containerized integration with #strong[Interactive Brokers], enabling clients to move proprietary strategies into live trading.
    - Designed market-beating strategies for multiple data providers using statistical and AI techniques to demonstrate the value of supplied data.
    - Developed ETL pipelines for client datasets and public market data from Bloomberg and Refinitiv.
    - Developed and operated the core backtesting framework and client-facing web application.
  ],
)

#grouped-entry(
  "Internships, Teaching and Research",
  "",
  "Atlanta, GA",
  "2016 - 2018",
  [
    #set list(marker: [•], indent: 1.02em, body-indent: 0.38em, spacing: 0.08em)
    - #strong[IBM Security], Software Developer Intern: Built a QRadar SIEM visualization app and an award-winning VR communication tool. #strong[Elavon, US Bank], Software Developer Intern: Supported organization-wide DevOps tooling and improved Commerce SDK test coverage.
    - #strong[Georgia Tech], Teaching and Research Assistant: Taught object-oriented design, mentored Android project teams, and built web and Android tools for HCI password-management research.
  ],
)

#section[Education]

#education-entry(
  "B.Sc. Computer Science",
  "Georgia Institute of Technology",
  "Atlanta, GA",
  "2015 - 2018",
  "Concentration in Intelligence and Information Internetworks",
  "GPA: 3.82 / 4.0",
)

#section[Technical Skills]

#skill-line(
  "Languages",
  [Go, Java, Python, SQL, Shell],
)
#skill-line(
  "Cloud / Infra",
  [AWS, Azure, GCP, Terraform, Kafka, Docker, Kubernetes],
)
