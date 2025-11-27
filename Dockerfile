FROM node:16.20.1 AS build
WORKDIR /app

ARG REACT_APP_API_URL=https://api.onayconsulting.az/api/v1/
ARG REACT_APP_BASE_URL=https://api.onayconsulting.az
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV NODE_ENV=production

COPY package.json /app/
RUN npm install --force

COPY ./ /app/
RUN npm run build

FROM nginx:1.23.3-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

