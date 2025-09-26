# Build stage
FROM node:22-alpine AS build

ARG next_public_api_url
ARG next_public_cdn_url
ENV NEXT_PUBLIC_API_URL $next_public_api_url
ENV NEXT_PUBLIC_CDN_URL $next_public_cdn_url

# Install dependencies
RUN apk add --no-cache git openssh-client build-base python3 py3-pip

# Set working directory
WORKDIR /data/app/

# Copy package.json and tsconfig files
COPY --chown=node:node package*.json tsconfig*.json ./
COPY --chown=node:node deploy ./deploy

# Install node modules including devDependencies with SSH key access
RUN --mount=type=ssh,id=pk-for-github yarn install --immutable --immutable-cache --check-cache

# Copy the rest of the application code
COPY --chown=node:node . .

# Build the application
RUN yarn build

# Prune devDependencies for production
RUN --mount=type=ssh,id=pk-for-github yarn install --production --ignore-scripts --prefer-offline

# Switch to node user
USER node

# Production stage
FROM node:22-alpine AS production

# Set working directory
WORKDIR /data/app/

# Copy node_modules and build artifacts from the build stage
COPY --chown=node:node --from=build /data/app/.next/standalone ./
COPY --chown=node:node --from=build /data/app/.next/static ./__static__
COPY --chown=node:node --from=build /data/app/public ./public

# Copy necessary config files
COPY --chown=node:node --from=build /data/app/package*.json ./
COPY --chown=node:node --from=build /data/app/tsconfig.json ./
COPY --chown=node:node --from=build /data/app/deploy ./deploy

# Switch to node user
USER node

# Start the application
CMD ["node", "server.js"]
