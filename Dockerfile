# Stage 1: Build
# Change ONLY the first line to use the larger, more stable image
FROM node:20 AS build 

WORKDIR /app

COPY package*.json ./

# npm clean install
RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Keep the Nginx stage as it was (Alpine is perfect here)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
