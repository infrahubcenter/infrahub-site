# Marketing site (static export) served by nginx.
# Published as docker.io/infrahubcenter/infrahub-site.
FROM --platform=$BUILDPLATFORM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Where "Sign in" links point -- baked in at build time.
ARG NEXT_PUBLIC_APP_URL=http://localhost
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
