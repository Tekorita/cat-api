# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia archivos esenciales primero para optimizar caché de Docker
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# No se necesita EXPOSE 3000 (docker-compose maneja esto)
