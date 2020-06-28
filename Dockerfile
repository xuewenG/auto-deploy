FROM node:12.17.0-stretch AS BUILDER
LABEL maintainer="xuewenG" \
        site="https://github.com/xuewenG/auto-deploy"

ENV MY_HOME=/root
RUN mkdir -p $MY_HOME
WORKDIR $MY_HOME

COPY package.json $MY_HOME
RUN set -x \
    && yarn

COPY . $MY_HOME
RUN set -x \
    && yarn build

FROM node:12.17.0-stretch
ENV MY_HOME=/root
RUN mkdir -p $MY_HOME
WORKDIR $MY_HOME

COPY package.json $MY_HOME
RUN set -x \
    && yarn && echo $MY_HOME

COPY --from=BUILDER /root/build .

ENTRYPOINT ["node", "index.js"]
