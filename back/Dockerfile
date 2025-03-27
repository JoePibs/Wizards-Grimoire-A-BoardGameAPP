FROM node:18

WORKDIR /app

# Copie des fichiers package.json et lock (si présent)
COPY package*.json ./

# Installer les dépendances depuis l’intérieur du conteneur
RUN npm install

# Installer Nest CLI (nécessaire pour `start:dev`)
RUN npm install -g @nestjs/cli

# Copie du reste du code
COPY . .

# Lancer le serveur NestJS en mode dev
CMD ["npm", "run", "start:dev"]
