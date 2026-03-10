# Stage 1: Builder
FROM node:22-alpine AS builder
WORKDIR /app
# Install turbo globally to prune the project
RUN npm install -g turbo
COPY . .
# Prune the workspace for the frontend app
RUN turbo prune --scope=frontend --docker

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
RUN npx turbo build --filter=frontend...

# Stage 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/frontend/package.json .
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

EXPOSE 3000
ENV PORT 3000
CMD ["node", "apps/frontend/server.js"]
