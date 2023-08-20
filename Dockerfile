FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json /app/

RUN npm install --force --silent
COPY ./ /app/
RUN npm run build

FROM nginx:1.23.3-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
