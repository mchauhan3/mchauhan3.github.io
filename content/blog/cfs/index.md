---
title: Containers From Scratch with cgroup v2
date: "2026-09-19"
description: "Following Containers From Scratch on a modern Linux system with cgroup v2."
---

I recently came across the [Containers From Scratch](https://www.youtube.com/watch?v=8fi7uSYlOdc) video by Liz Rice, which is a really great introduction to the concepts behind containerization systems such as Docker. I followed along on my own system (Fedora 44) and noticed a few differences. The main one is that the video, from 2018, uses the cgroup v1 interface, while newer systems use cgroup v2.

## Updating the cgroup code for v2

The video uses cgroup v1, where the `pids` controller has its own hierarchy:

```text
/sys/fs/cgroup/pids/<name>
```

Cgroup v2 uses one unified hierarchy. The equivalent directory is:

```text
/sys/fs/cgroup/<name>
```

The v1 `tasks` file corresponds to `cgroup.threads` in v2, but `cgroup.procs` is the appropriate interface for moving the whole container process. The v1 `notify_on_release` file is not used in v2.

The cgroup v2 counterpart to v1's `memory.limit_in_bytes` is `memory.max`. It sets a hard memory limit in bytes, while `max` means no limit.

To limit the container to 20 tasks:

1. Create `/sys/fs/cgroup/<name>`.
2. Write `20` to `pids.max`.
3. Write the current PID, or `0`, to `cgroup.procs`.

Writing `0` means the process performing the write. Its descendants inherit its cgroup membership. Threads also count toward `pids.max`.

Using `mohit` as `<name>`, the cgroup v2 version of `cg()` is:

```go
func cg() {
	cgroup := "/sys/fs/cgroup/mohit"
	must(os.MkdirAll(cgroup, 0755))
	must(os.WriteFile(filepath.Join(cgroup, "pids.max"), []byte("20"), 0700))
	must(os.WriteFile(filepath.Join(cgroup, "cgroup.procs"), []byte("0"), 0700))
}
```

## Finding a Docker container's cgroup

With cgroup v2 and Docker's systemd cgroup driver, a running container's cgroup is usually located at:

```text
/sys/fs/cgroup/system.slice/docker-<container-id>.scope
```

To find the exact path, first get the container's host PID:

```bash
docker inspect --format '{{.State.Pid}}' <container>
```

Then read `/proc/<pid>/cgroup`. An entry such as:

```text
0::/system.slice/docker-<container-id>.scope
```

maps to the same path beneath `/sys/fs/cgroup`. Files such as `memory.current`, `cpu.stat`, `pids.current`, and `io.stat` contain the container's current resource usage.
