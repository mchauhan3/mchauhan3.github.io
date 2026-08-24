# Brag Doc — Mohit Chauhan, P-1 AI

**Scope:** commits authored as `mohit@p-1.ai` across five repos — `archie-platform`,
`platform-deployments`, `gitops-system`, `gitops-workloads`, `p-1ai-obs-central`.
**Window:** 2026-05-13 → 2026-08-21 (~14 weeks).
**Volume:** ~450 commits, **183 merged PRs**, ~39,000 lines added / ~11,200 removed.

| Repo | Commits | Merged PRs | Lines added |
|---|---|---|---|
| archie-platform | 174 | 97 | +32,005 |
| platform-deployments | 115 | 28 | +4,554 |
| gitops-workloads | 103 | 41 | +1,920 |
| gitops-system | 58 | 15 | +550 |
| p-1ai-obs-central | 5 | 2 | — |

---

## 1. Built `archie-platform` — the distributable Kubernetes platform — from zero

Scaffolded the repo on 2026-05-28 and drove it to a shipping product in three months.

- Scaffolded the Kubebuilder operator and grew it into the platform's control plane:
  `Platform`, `Plane`, `Agent`, `Component`, `Edge`, `Mesh`, `Observability`, `Pyexec`,
  `KnowledgeBase`, `Catalog`, `Crate`, `Simulation`, `Machine`, `Metrics` CRDs.
- Wrote the orchestration engine on the **Helm v4 Go SDK** — install/upgrade handlers,
  writable Helm cache, skip-if-current upgrades, requeue-only-until-converged semantics,
  and full `Platform` teardown (`#45`, `#47`, `#58`, `#94`, `#98`).
- Designed the chart layer: an `archie-common` Helm library plus **28 component charts**
  (langsmith, pgvector/CNPG, neo4j, hindsight, daytona/pyexec, mesh, PKI, tailscale,
  the Grafana/Loki/Mimir/Tempo/Alloy observability stack, …), with a single registry knob
  and single-source operand images derived from `.Chart.Version` (`#39`, `#105`, `#106`).
- Overhauled the user-facing status surface — conditions, Kubernetes Events, printer
  columns — so operators could tell what the platform was actually doing.

## 2. Owned release engineering and CI for the platform monorepo

- Stood up the whole release path in the first week: **Release Please** in monorepo manifest
  mode, Conventional-Commit PR-title linting, squash-only merges, 0.x-aware SemVer bumps,
  and automated **GHCR** publishing (replacing Artifact Registry) — `#25`–`#34`.
- Built the test strategy end to end: a **kind conformance harness**, a declarative
  **Chainsaw** e2e suite replacing an ad-hoc bash script, JUnit reporting, coverage,
  documented test tiers, and path-safe required CI lanes (`#26`, `#27`, `#38`).
- Wrote `cut-release.sh` for pinned-tuple release cuts, then executed cuts pinning
  `archie-tng` / `archie-ui` / `archie-sandbox` versions ~12 times through the summer.
- **Measured** CI performance rather than guessing: cached and parallelised RC image
  builds, gave Go a persistent build cache, pushed images and charts concurrently — and
  reverted the RC layer cache when the data showed a regression (`#605`, `#608`, `#609`, `#611`).

## 3. Ran the production deployment train across every customer environment

- Executed deployments **D6 through D19** — 14 consecutive release trains — across
  `p-1` stg/prod, `jci` prod, `daikin` prod, `mvp` prod, `solo` prod, and `chillers` prod.
- Bootstrapped `platform-deployments` (2026-07-08) as the GitOps home for customer
  installs: OpenTofu infra + Flux, ordered operator→platform Kustomizations, and a
  `<cloud>/<customer>/<env>` hierarchy.
- Brought up **two brand-new production environments** end to end: `solo-prod`
  (public edge at `my.archie.engineer`, Onshape OAuth, LE certs, static IP, prod-tier
  node sizing) and `gcp/chillers/prod` (infra roots → overlay → Flux entrypoint).
- Automated RC promotion (`operator-rc-bump` poll job) so environments tracked the
  newest release candidate without manual edits.
- Captured the hard-won knowledge as an `add-deployment-environment` **skill** and
  runbooks, including the failure modes that actually bite: the PD CSI topology race on
  freshly-autoscaled nodes, the late-CA race that writes an empty `caBundle`, and the
  one case where a human must intervene.

## 4. Migrated the data layer from in-cluster Postgres to managed Cloud SQL

- Designed and shipped **externally-managed Postgres (Cloud SQL)** for the per-agent
  application database (`#606`), with a deliberately small two-item BYO contract so
  customers aren't forced onto the Cloud SQL scaffolding.
- Landed the prerequisites: External Secrets Operator on keyless Workload Identity,
  PSC connectivity, provider APIs made additive so consumers stop clobbering the list,
  and a documented migration runbook (`#610`, `#7`, `#13`).
- Migrated `archie-tng` and `hindsight` onto Cloud SQL in dev2, then solo-prod and
  chillers-prod, one service at a time.
- Debugged and fixed a Cloud SQL provider trap — `Query Insights record_client_address`
  silently breaks PSC instance creation (`#637`).
- Shipped **ADR 0033 — direct database access endpoint** (`#652`): a TCPRoute-based
  endpoint for developers, including carving the database listener ports out of STRICT
  mTLS in the mesh and granting the operator `tcproutes`/`events` (`#669`, `#673`).

## 5. Made the observability stack trustworthy

- Wired the **obs-central private backbone** (PSC) across environments and maintained the
  PSC consumer accept-list in `gitops-system` as clusters came and went.
- Routed OTLP-pushed metrics through the Alloy gateway to Mimir (`#569`); stamped
  `cluster`/`client` labels onto alert rules so obs-central can tell deployments apart (`#686`).
- Cut alert noise at the source: suppressed `KubeJobFailed` for jobs that ultimately
  succeeded and for succeeded CronJobs, added a **per-deployment alert severity downgrade
  knob** (`#759`), and stopped `rogo` raising high-urgency PagerDuty incidents.
- Added a real signal in its place: alerting on permanent LLM call failures escaping the
  resilience retry loop.
- Self-hosted LangSmith operations: 400-day trace retention (vs. the 14-day default),
  right-sized production ClickHouse (100Gi) and Redis, a generic store-disk migration path,
  and a 2-minute startup grace window for LGP agent pods.
- Remediated CVEs across Grafana/Loki/Pyroscope/Mimir (ARCH-1770–1773), including the
  Grafana 12 alert-rule UID length break.

## 6. Hardened security posture across CI, cloud IAM, and the mesh

- Removed `roles/editor` from per-project GitHub Actions service accounts and replaced
  broad grants with scoped **Workload Identity Federation** bindings per publisher
  (`cust-pilot-dashboard`, `archie-metrics`, `archie-handbook`, `archie-platform` cut branches).
- Created a **scoped read-only `devin-triage` service account** for agent-driven triage
  rather than handing an automation broad project access (`#129`, `#130`).
- Deleted the shared "mothership" Enovia credential blob in favour of per-environment
  secrets loaded through a Pydantic secrets mixin, gated behind an `enovia_enabled` flag.
- Enabled **Cloud IDS** on p-1 dev and prod and **VPC Flow Logs** on the GKE subnet;
  hardened Flux with an SSH deploy key and a dedicated least-scope read token.
- Stopped the sandboxed LangSmith playground / ace-backend from phoning home (`#601`) —
  a genuine egress leak in an air-gapped deployment.
- Kept the supply chain current: `oras-go` vulnerability fix, `grpc` → v1.82.1, and p-1
  root-CA trust plumbed through Aztec settings fetch, Grafana alerting, and LangSmith's
  custom CA store.

## 7. Platform infrastructure in Terraform/Terragrunt

- Provisioned private GKE clusters for `dev`, `dev-b`, `dev2`, `stg`, `solo-prod`, and
  `chillers-prod`, plus Vertex AI Workload Identity, autoscaling node pools, Filestore CSI
  for per-agent RWX workspaces, and Artifact Registry pull access.
- Made the GKE control-plane endpoint configurable and added **Connect Gateway**
  registration behind a feature flag (`#704`, `#705`).
- Caught and fixed a latent footgun: an unpinned `node_config spot` default that would
  have **replaced running clusters** on the next apply.

## 8. Notable engineering judgment calls

- **Deleted complexity when it wasn't earning its keep**: dropped CloudNativePG for a plain
  Postgres StatefulSet (`#97`), retired the umbrella charts and Component-CR model when the
  design outgrew them (`#144`), removed the shared dev base for a standalone Platform CR,
  removed unused redis/dead constants.
- **Reconciled docs with reality repeatedly** rather than letting them rot — retracted a
  stale `severity_N` paging claim, corrected an ESO keyless-WI precedent claim, dropped a
  `rawPredict` Model Garden probe that false-negatives, and rewrote the BYO-Postgres docs to
  lead with the contract instead of the implementation.
- **Reverted own work on evidence** (RC layer cache, langsmith memory bump) instead of
  defending it.

---

## Resume bullets (2-line version)

- **Built P-1's bring-your-own-cloud deployment platform from scratch — first commit to customer
  production in three months** — a Go/Kubebuilder operator and composable Helm chart system that
  installs and upgrades the full product stack inside a customer's own Kubernetes cluster from a
  single declarative spec. Replaced bespoke per-customer setup, letting enterprise customers run the
  product entirely within their own VPC and compliance boundary, air-gapped. Now the single
  deployment path for P-1's own environments as well, so internal and customer installs never
  diverge.

- **Owned production deployment and release operations for P-1's customer fleet** — accountable for
  standing up new customer environments, shipping every release across them, and responding when one
  broke. Built the automation behind it: GitOps reconciliation and pinned release promotion that kept
  customer clusters from drifting apart, and centralized observability that surfaced failures inside
  customer clouds without needing hands-on access to them.

### Open numbers to fill

- `[X] to [Y]` in bullet 2 — no before-state exists in the commit history. Candidates: environment
  standup time (`solo-prod` vs. the later `chillers-prod`), time-to-detect on a customer-cluster
  failure before vs. after obs-central attribution, or drift incidents per release train.
- Bullet 1's "three months" is verified: first commit 2026-05-28, `solo-prod` and `chillers-prod`
  live by 2026-08-11.

### Framing notes

- **Do not claim multi-cloud.** The repos carry `infra/stacks/{aws,azure,gcp}` and separate
  `root.azure.hcl` / `root.gcp.hcl`, but this author's infra commits are 29 files in `modules/gcp`,
  3 in `stacks/gcp`, and zero in azure or aws. The only Azure fingerprints are the `azure_anthropic`
  model provider (#128) and `azure/mvp/dev` flag gating — neither is infrastructure ownership.
  "Cloud-abstracted topology" is the defensible phrasing.
- **Do not claim obs-central was built from scratch.** It predates these commits (Paul, Jon). What
  is supported: wiring the PSC backbone across environments and making alerts attributable per
  cluster/client — i.e. turning it into fleet visibility.
