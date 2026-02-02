export default {
    id: 'docker',
    name: 'Docker',
    icon: '🐳',
    description: 'Container platform for packaging applications and dependencies into portable, isolated environments.',
    concepts: [
        {
            title: 'Container Basics',
            content: `Containers package applications with dependencies. Lighter than VMs - share host kernel. Isolated via namespaces and cgroups.

Images are read-only templates. Containers are running instances. Layers enable efficient storage and caching.`,
            codeExample: {
                language: 'bash', code: `docker run -d -p 80:80 nginx          # Run container
docker ps                              # List running
docker stop <id>                       # Stop container
docker rm <id>                         # Remove container
docker images                          # List images` }
        },
        {
            title: 'Dockerfile',
            content: `Text file defining how to build an image. Instructions: FROM (base), COPY/ADD (files), RUN (commands), CMD/ENTRYPOINT (runtime), EXPOSE, ENV, WORKDIR.

Order matters for layer caching. Fewer layers = smaller images. Multi-stage builds reduce final size.`,
            codeExample: {
                language: 'dockerfile', code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]` }
        },
        {
            title: 'Multi-Stage Builds',
            content: `Multiple FROM statements in one Dockerfile. Build in one stage, copy artifacts to minimal final image. Reduces image size significantly.

Common pattern: Build with SDK image, run with runtime image.`,
            codeExample: {
                language: 'dockerfile', code: `# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html` }
        },
        {
            title: 'Docker Networking',
            content: `Network drivers: bridge (default), host, none, overlay (Swarm), macvlan. Containers on same bridge can communicate by name.

Port mapping: -p host:container. Networks isolate container groups.`,
            codeExample: {
                language: 'bash', code: `docker network create mynet
docker run -d --network mynet --name db postgres
docker run -d --network mynet --name app myapp
# app can reach db by hostname "db"` }
        },
        {
            title: 'Docker Volumes',
            content: `Persist data beyond container lifecycle. Volume types: named volumes (managed by Docker), bind mounts (host path), tmpfs (memory).

Named volumes preferred for data persistence. Bind mounts for development.`,
            codeExample: {
                language: 'bash', code: `docker volume create mydata
docker run -v mydata:/var/lib/mysql mysql
docker run -v $(pwd):/app node          # Bind mount
docker run --tmpfs /tmp myapp           # tmpfs` }
        },
        {
            title: 'Docker Compose',
            content: `Define multi-container apps in YAML. Single command to start all services. Manages networks, volumes, dependencies.

Version 3+ for Swarm compatibility. Services, networks, volumes sections. Override files for environments.`,
            codeExample: {
                language: 'yaml', code: `services:
  web:
    build: .
    ports: ["3000:3000"]
    depends_on: [db]
  db:
    image: postgres:15
    volumes: [pgdata:/var/lib/postgresql/data]
volumes:
  pgdata:` }
        },
        {
            title: 'Image Optimization',
            content: `Smaller images = faster pulls, less attack surface. Use slim/alpine bases. Multi-stage builds. Minimize layers with combined RUN.

.dockerignore excludes files from context. Order instructions for cache efficiency (dependencies before code).`,
            codeExample: {
                language: 'dockerfile', code: `# .dockerignore
node_modules
.git
*.log

# Combine RUN commands
RUN apt-get update && apt-get install -y \\
    package1 \\
    package2 \\
    && rm -rf /var/lib/apt/lists/*` }
        },
        {
            title: 'Docker Registry',
            content: `Store and distribute images. Docker Hub is default public registry. Private registries: ECR, GCR, ACR, Harbor.

Tag images with registry/repo:tag. Push/pull to share. Scan images for vulnerabilities.`,
            codeExample: {
                language: 'bash', code: `docker tag myapp:latest myregistry.com/myapp:v1.0
docker push myregistry.com/myapp:v1.0
docker pull myregistry.com/myapp:v1.0

# Login to private registry
docker login myregistry.com` }
        },
        {
            title: 'Container Security',
            content: `Run as non-root user. Read-only filesystem. Drop capabilities. Scan images for CVEs. Use trusted base images.

Secrets management: Docker secrets, mounted files, env vars (less secure). Don't store secrets in images.`,
            codeExample: {
                language: 'dockerfile', code: `FROM node:18-alpine
RUN addgroup -S app && adduser -S app -G app
USER app
WORKDIR /app
COPY --chown=app:app . .
# Read-only at runtime with docker run --read-only` }
        },
        {
            title: 'Docker Commands',
            content: `Essential commands: build, run, exec, logs, inspect, cp. Debug with exec -it /bin/sh. Prune for cleanup.

Resource limits: --memory, --cpus. Health checks: HEALTHCHECK instruction or --health-cmd.`,
            codeExample: {
                language: 'bash', code: `docker build -t myapp:v1 .           # Build image
docker exec -it <id> /bin/sh         # Shell into container
docker logs -f <id>                  # Follow logs
docker inspect <id>                  # Detailed info
docker system prune -a               # Cleanup all unused` }
        }
    ],
    questions: [
        { question: 'What is the difference between a container and a VM?', answer: `VMs: Full OS per instance, hypervisor, heavier, slower startup.
Containers: Share host kernel, lighter, seconds to start, less isolation.
Containers for apps, VMs for different OSes or strong isolation.` },
        { question: 'Explain Docker layers and caching.', answer: `Each Dockerfile instruction creates a layer.
Layers are cached and reused.
Changing a layer invalidates subsequent layers.
Order matters: put rarely-changing (deps) before often-changing (code).` },
        { question: 'What is the difference between CMD and ENTRYPOINT?', answer: `CMD: Default command, can be overridden at run.
ENTRYPOINT: Always executes, CMD becomes arguments.
Use together: ENTRYPOINT for command, CMD for default args. exec form preferred.` },
        { question: 'How do you reduce Docker image size?', answer: `Use alpine/slim bases.
Multi-stage builds.
Combine RUN commands.
Remove caches (rm -rf /var/lib/apt/lists/*).
Use .dockerignore.
Don't install unnecessary packages.` },
        { question: 'Explain Docker networking modes.', answer: `bridge: Default, isolated network. host: Uses host network directly. none: No networking. overlay: Multi-host (Swarm). macvlan: Direct MAC address.
Bridge for most apps.` },
        { question: 'What is the difference between COPY and ADD?', answer: `COPY: Simple file copy.
ADD: Also extracts tar archives, supports URLs (not recommended).
Use COPY unless you need tar extraction.
More predictable.` },
        { question: 'How do volumes differ from bind mounts?', answer: `Volumes: Docker-managed, named, portable, recommended for data.
Bind mounts: Map host path, useful for development. tmpfs: Memory only, not persisted.` },
        { question: 'What is Docker Compose used for?', answer: `Define multi-container apps in YAML.
Single command (docker compose up) starts all services.
Manages networks, volumes, dependencies.
Great for development and testing.` },
        { question: 'How do you handle secrets in Docker?', answer: `Avoid env vars (visible in inspect).
Docker secrets (Swarm).
Mount secrets as files.
External secret managers (Vault).
Never bake secrets into images.` },
        { question: 'Explain multi-stage builds.', answer: `Multiple FROM statements.
Build in one stage, copy artifacts to minimal final stage.
Reduces image size drastically.
Example: Build with SDK, run with runtime-only image.` },
        { question: 'How do you debug a running container?', answer: `docker exec -it <id> /bin/sh: Shell access. docker logs -f: Follow logs. docker inspect: Detailed info. docker stats: Resource usage. docker cp: Copy files in/out.` },
        { question: 'What is the difference between docker run and docker start?', answer: `run: Creates and starts new container from image. start: Starts existing stopped container. run creates container each time; start reuses existing.` },
        { question: 'How do health checks work?', answer: `HEALTHCHECK instruction or --health-cmd.
Runs command periodically.
Container marked healthy/unhealthy.
Orchestrators use for readiness/restart decisions.` },
        { question: 'What is a dangling image?', answer: `Untagged images, often from rebuilds.
Listed as <none>:<none>.
Clean with docker image prune.
They consume disk space.
Can accumulate without cleanup.` },
        { question: 'How do you limit container resources?', answer: `--memory: RAM limit. --cpus: CPU limit. --memory-swap: Swap limit.
Without limits, containers can consume all host resources.
Important for production.` }
    ]
};
