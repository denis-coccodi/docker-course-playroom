FROM node:14-alpine

WORKDIR /app

# any command entered while running an image (docker run) will start with "npm"
# ie 'docker run -it -v ${pwd}:/app node-util init' will run 'npm init'
# this limits what commands can be run with the image
ENTRYPOINT [ "npm" ]

# docker build -t node-util .

# have the container create a node app on the host machine through a bind mount
# docker run -it -v ${pwd}:/app node-util init