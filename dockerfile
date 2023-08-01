FROM node:20 AS build-env
WORKDIR /app

COPY package.json ./
COPY *.lock ./

RUN npm install --omit=dev

COPY . .

FROM gcr.io/distroless/nodejs20-debian11
COPY --from=build-env /app /app
WORKDIR /app
RUN npm run build
CMD ["npm", "run", "prod"]