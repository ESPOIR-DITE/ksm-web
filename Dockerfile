### STAGE 1: Build ###
FROM node:16.15.0-alpine AS ksm-web-app
WORKDIR /app

#COPY package.json package-lock.json ./
COPY . .

RUN npm install

RUN npm run build --prod
### STAGE 2: Run ###
FROM nginx:1.21.6-alpine
COPY --from=ksm-web-app /app/dist/ksm-web /usr/share/nginx/html
EXPOSE 1338:1338

