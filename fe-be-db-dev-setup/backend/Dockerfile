FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

ENV MONGODB_USERNAME=admin

ENV MONGODB_PASSWORD=secret

VOLUME [ "/app/node_modules" ]

CMD [ "npm", "start" ]

# docker network create goals-net
# if having mongodb credentials issues, check that no other preexisting volume is still up
# docker run --name mongodb --rm -d -v mongodb:/data/db -e MONGO_INITDB_ROOT_USERNAME=denis -e MONGO_INITDB_ROOT_PASSWORD=secret --network goals-net mongo
# docker build -t goals-node .
# need to export the port for the FE to communicate through as the FE runs in the browser and needs to be reachable on localhost
# docker run --name goals-be --rm -d -p 80:80 --network goals-net -v ${pwd}:/app -v logs:/app/logs -e MONGODB_USERNAME=denis -e MONGODB_PASSWORD=secret goals-node