FROM node:8-stretch
RUN apt-get update
RUN apt-get install nginx -y

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

RUN mkdir /app && cp -a /tmp/node_modules /app/

WORKDIR /
COPY . /app
WORKDIR /app
RUN npm run build
RUN mkdir -p /www
RUN ls
RUN cp -r build /www
COPY config/nginx/nginx.conf /etc/nginx/sites-enabled/default

ENV VIRTUAL_HOST=staging.disten.se
EXPOSE 443 443
EXPOSE 80 80