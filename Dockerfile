FROM node:8.9.0

RUN mkdir /app

WORKDIR /app

ADD . /app

RUN cd /app

RUN npm cache clear --force

RUN npm set registry https://registry.npmjs.org/

RUN npm install

RUN npm run build

ENTRYPOINT ["node", "dist", ""]
