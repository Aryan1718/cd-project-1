FROM node:10-alpine
RUN mkdir -p "C:\Users\yashs\OneDrive\Desktop\cs\projectCS\cd-project-1\node_modules" && chown -R node:node "C:\Users\yashs\OneDrive\Desktop\cs\projectCS\cd-project-1\node_modules"
WORKDIR "C:\Users\yashs\OneDrive\Desktop\cs\projectCS\cd-project-1"
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD ["node","app.js"]