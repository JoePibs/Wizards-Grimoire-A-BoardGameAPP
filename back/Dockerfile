# Utilise l'image Node.js officielle
FROM node:18

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le reste du projet
COPY . .

# Compile TypeScript en JavaScript
RUN npm run build

# Expose le port utilisé par NestJS
EXPOSE 3002

# Commande de démarrage
CMD ["npm", "run", "start:dev"]
