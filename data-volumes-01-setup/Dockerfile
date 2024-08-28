FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

ENV PORT 80

EXPOSE $PORT

CMD ["npm", "start"]

# creates a container with a named volume to persist feedback data. Based on feedback-node:volumes image
# docker run --name feedback-app --rm -p 3000:80 -v feedback:/app/feedback -d feedback-node:volumes

# with bound mount to watch code changes, and anonymous volume to preserve the node_modules just installed from the image
# docker run --name feedback-app-bound-mount --rm -p 3000:80 -v feedback:/app/feedback -v ${pwd}:/app -v /app/node_modules -d feedback-node:volumes