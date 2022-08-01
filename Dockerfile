FROM node:14-alpine as build-step

WORKDIR /app 

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./package-lock.json ./

COPY ./src ./src

COPY ./public ./public


RUN npm install

RUN npm run build


FROM nginx:stable-alpine

RUN groupadd -r chama && useradd -r -g chama chama

RUN  chsh -s /usr/sbin/nologin root

EXPOSE 80

COPY --from=build-step /app/build /usr/share/nginx/html
