FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY client/package.json client/
COPY client/package-lock.json client/
RUN npm run install-client --omit=dev

COPY server/package.json server/
COPY server/package-lock.json server/
RUN npm run install-server --omit=dev

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000