FROM node:8.11.1

ADD ./node_modules /app/node_modules
ADD ./package.json /app/package.json
ADD ./source /app/source

WORKDIR /app

EXPOSE 9999

ENTRYPOINT ["node"]

CMD ["source/app.js"]