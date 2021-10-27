FROM node:14
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD ls && \
    cd backend && \
    yarn install && \ 
    yarn knex migrate:latest &&\
    node index.js 