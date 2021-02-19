FROM nginx:1.19.3-alpine

EXPOSE 9000

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/lightingo /usr/share/nginx/html
