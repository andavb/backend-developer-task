FROM node:16

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

COPY ./src ./src

RUN ls -a

RUN npm install
RUN npm run build

COPY . .

EXPOSE 8001

CMD [ "npm", "start", "dist/index.js"]