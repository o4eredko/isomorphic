FROM node
WORKDIR /app
COPY package.json /app
RUN yarn
EXPOSE 3000
CMD ["yarn", "start"]
