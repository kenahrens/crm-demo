# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# Use template for envsubst to substitute DNS_RESOLVER at runtime
COPY nginx.conf /etc/nginx/templates/default.conf.template
# Default to Docker's embedded DNS; override with kube-dns.kube-system.svc.cluster.local for K8s
ENV DNS_RESOLVER=127.0.0.11
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 