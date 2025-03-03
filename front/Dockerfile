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

# Expose le port utilisé par Next.js
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "dev"]
