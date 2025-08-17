FROM node:22-alpine AS builder
WORKDIR /app
COPY . ./

## instala somente o que esta no package.lock.json
## RUN npm ci --only=production
RUN npm ci 
EXPOSE 3333

CMD [ "node", "src/server.ts" ]
