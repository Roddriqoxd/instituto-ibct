# Etapa 1: Construcción de la aplicación
FROM node:22-alpine as build

WORKDIR /app

# Copiamos package.json e instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y compilamos Angular
COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar la configuración personalizada de Nginx (opcional)
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el build de Angular al directorio de Nginx
COPY --from=build /app/dist/intituto-ibct-fe/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
