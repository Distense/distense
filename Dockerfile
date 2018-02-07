FROM node:8-stretch

WORKDIR /distense-ui

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]


FROM nginx
RUN mkdir -p /www
COPY build /www

# Vhost to serve files
COPY config/nginx.conf /etc/nginx/sites-available/default
CMD ["nginx", "-g", "daemon off;"]
