FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

# docker build -t goals-react .
# need to expose the port for it being callable from the machine browser, and needs -it or the react server creation breaks 
# it is not necessary to add the FE to the goals-net as it runs in the browser, and the browser couldn't translate the container names for the addressing
# docker run --name goals-fe --rm -d -it -p 3000:3000 -v ${pwd}/src:/app/src goals-react