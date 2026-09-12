FROM oven/bun:1.4.2-alpine AS builder
WORKDIR /app

# The footer stamps the commit it was built from, which is read with git
RUN apk add --no-cache git

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
# The image ships no node, so --bun runs the next cli on bun's own runtime
RUN bun --bun run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
