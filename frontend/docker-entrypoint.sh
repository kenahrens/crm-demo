#!/bin/sh
set -e

# Default backend host and port
BACKEND_HOST="${BACKEND_HOST:-crm-core}"
BACKEND_PORT="${BACKEND_PORT:-80}"

# Check if we're running in Docker network (Docker DNS available)
# If not, use a public DNS resolver
if ! getent hosts 127.0.0.11 > /dev/null 2>&1; then
    echo "Docker DNS not available, using public resolver"
    sed -i 's/resolver 127.0.0.11 8.8.8.8/resolver 8.8.8.8/g' /etc/nginx/conf.d/default.conf
fi

# Replace backend placeholder in nginx config
sed -i "s|set \$backend \"http://crm-core\";|set \$backend \"http://${BACKEND_HOST}:${BACKEND_PORT}\";|g" /etc/nginx/conf.d/default.conf

# Test nginx configuration
nginx -t

# Start nginx
exec nginx -g 'daemon off;'
