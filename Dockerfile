# ---- Base Node ----
FROM node:14 AS base
WORKDIR /app

# ---- Dependencies ----
COPY package.json .
RUN npm install

# ---- Copy Files/Build ----
COPY . /app
RUN npm run build

# --- Release ----
FROM node:14-slim AS release
WORKDIR /app

COPY --from=base /app/package.json .
RUN npm install --only=production

COPY --from=base /app/dist ./dist
CMD ["npm", "run", "start:prod"]

ENV NX_API_URL='http://localhost:3000'
ENV NX_APP_URL='http://localhost:4200'
ENV NX_DB_HOST='ec2-54-155-46-64.eu-west-1.compute.amazonaws.com'
ENV NX_DB_NAME='d8ltusdl7s3oer'
ENV NX_DB_PASSWORD='c38960a9ec14cf9f562bb8da74b26544de72739aa367799c14334ccc11a85a67'
ENV NX_DB_PORT='5432'
ENV NX_DB_USER='yvksorqbtzcmvp'
ENV NX_DB_SYNC='false'
ENV NX_GOOGLE_CLIENT_ID='279197147956-crkjjsgnli3r0livtoochkucl7egdkgh.apps.googleusercontent.com'
ENV NX_GOOGLE_CLIENT_KEY='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'
ENV NX_SESSION_SECRET='secret'
ENV NX_OPENAI_API_KEY='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'
ENV NX_OPENAI_ORG_ID='org-1adfmpsY3gvFnAXfSHieI5rH'
