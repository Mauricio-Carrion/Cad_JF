FROM node:18.12.1 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.3 as production
COPY --from=builder /app/build /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]