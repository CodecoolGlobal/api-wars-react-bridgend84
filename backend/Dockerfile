FROM node:latest
WORKDIR /app
COPY ./package.json ./package.json
COPY ./server.js ./server.js
COPY ./people.model.js ./people.model.js
COPY ./planets.model.js ./planets.model.js
COPY ./users.model.js ./users.model.js
RUN npm install
EXPOSE 8080
ENV MONGO_DB_URI mongodb://mongo:27018/api_wars_data
CMD ["node", "server.js"]