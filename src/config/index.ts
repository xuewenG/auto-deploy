const env = process.env

export const serverConfig = {
  port: env.PORT || 8081,
  contextPath: env.CONTEXT_PATH || '/auto-deploy',
  corsOrigin: (env.CORS_ORIGIN || '').split(',')
}

export const mysqlConfig = {
  host: env.MYSQL_HOST || '',
  user: env.MYSQL_USER || '',
  password: env.MYSQL_PASSWORD || '',
  database: env.MYSQL_DATABASE || 'auto-deploy'
}
