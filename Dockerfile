FROM node:12.17.0-stretch AS BUILDER
LABEL maintainer="xuewenG" \
  site="https://github.com/xuewenG/auto-deploy"

ENV MY_HOME=/root
RUN mkdir -p $MY_HOME
WORKDIR $MY_HOME

COPY package.json $MY_HOME
RUN set -x \
  && yarn install

COPY . $MY_HOME
RUN set -x \
  && yarn run build

FROM node:12.17.0-stretch

ENV MY_HOME=/root
RUN mkdir -p $MY_HOME
WORKDIR $MY_HOME

RUN set -x \
  && curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
  && chmod +x /usr/local/bin/docker-compose

COPY package.json $MY_HOME
RUN set -x \
  && yarn install --production

COPY --from=BUILDER /root/dist .

ENTRYPOINT ["node", "index.js"]
