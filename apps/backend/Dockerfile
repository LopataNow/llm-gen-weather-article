# Stage 1: Builder
FROM node:22-alpine AS builder
WORKDIR /app
# Install turbo globally to prune the project
RUN npm install -g turbo
COPY . .
# Prune the workspace for the backend app
RUN turbo prune --scope=backend --docker

# Stage 2: Installer
FROM node:22-alpine AS installer
WORKDIR /app
# Add lockfile and package.json's of isolated subworkspace
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
# Install dependencies
RUN npm install

# Copy source code of isolated subworkspace
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
# Build the project
RUN npx turbo build --filter=backend...

# Stage 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer /app/apps/backend/package.json .
COPY --from=installer /app/apps/backend/dist ./dist
COPY --from=installer /app/node_modules ./node_modules

EXPOSE 3001
CMD ["node", "dist/main"]