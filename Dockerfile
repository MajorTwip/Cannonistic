FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN date && npm install && mkdir data
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .


EXPOSE 80
CMD [ "node", "server/index.js" ]
