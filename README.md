# 介绍

这是一个基于 Webhooks 和 Docker 的自动化部署工具。

只需要在待部署的项目中编写相应的 Dockerfile 和 docker-compose.yml 配置文件，即可在每次推送代码时自动部署。

# 安装

## 安装 Docker 环境

工具依赖于 Docker，因此需要先安装 Docker 环境，参考 [Get Docker | Docker Documentation](https://docs.docker.com/get-docker/) (如果已经安装，可以跳过此步)

## 准备数据库

安装 MySQL 数据库，可以使用 Docker 安装，参考 [MySQL - Docker Hub](https://hub.docker.com/_/mysql)。

创建数据库 `auto-deploy`，导入 `sql` 目录下的脚本 `table_*.sql`，创建需要的数据表。

## 准备 SSH 密钥 (非必须)

如果 Git 仓库是私有仓库，需要验证身份，可以创建 `SSH Key`，参考 [Connecting to GitHub with SSH - Github Docs](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh)。

## 运行工具

使用以下命令运行：

```shell
docker run -d \
-e PORT=8081 \
-e MYSQL_HOST=localhost \
-e MYSQL_USER=username \
-e MYSQL_PASSWORD=password \
-v /etc/localtime:/etc/localtime:ro
-v /var/run/docker.sock:/var/run/docker.sock
--net host
--name auto-deploy-docker \
ixuewen/auto-deploy
```

如果需要 SSH Key 来验证身份，只要将私钥也挂载进容器即可。

可选的环境变量有：

| 环境变量       | 作用                                                                                          | 默认值       |
| -------------- | --------------------------------------------------------------------------------------------- | ------------ |
| PORT           | 监听的端口号                                                                                  | 8081         |
| CONTEXT_PATH   | 请求地址前缀                                                                                  | /auto-deploy |
| CORS_ORIGIN    | 允许的跨域列表。若有多个 Origin，请使用 `,` 分隔，例如：`http://localhost,http://example.com` | ''           |
| MYSQL_HOST     | 数据库地址                                                                                    | ''           |
| MYSQL_USER     | 数据库用户名                                                                                  | ''           |
| MYSQL_PASSWORD | 数据库密码                                                                                    | ''           |
| MYSQL_DATABASE | 数据库名                                                                                      | auto-deploy  |

## 配置工具

完成以上步骤后，工具就已经可以正常运行了。下面打开数据库，手动添加一条记录，例如：

| projectName | gitUrl                               | branch | secret             | projectEnv   |
| ----------- | ------------------------------------ | ------ | ------------------ | ------------ |
| sync-play   | git@github.com:xuewenG/sync-play.git | master | YOUR_DEPLOY_SECRET | {Key: Value} |

其中需要注意的是 `YOUR_DEPLOY_SECRET` 为随机字符串，可以随便填写，但是需要防止泄露。

## 配置 Webhooks

打开 Github 仓库的设置页面，选择 Webhooks，创建一个新的 Webhook，按照以下规则设置各个表单项。

1. Payload URL: http://${YOUR_DOMAIN}:${PORT}/${CONTEXT_PATH}/project/${PROJECT_NAME}/deploy
2. Content type: application/json (必须)
3. Secret: 数据库中填写的 secret

其他保持默认。
