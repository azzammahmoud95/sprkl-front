# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=16.15.1

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm config set unsafe-perm true
RUN npm install --silent

COPY . .

RUN chown -R node /app/node_modules

USER node

CMD ["npm", "start"]