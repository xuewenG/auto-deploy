import express from 'express'
import * as ProjectUtil from '../utils/project'
import child_process from 'child_process'
import getCommand from '../utils/command'
import { verifyPostData } from '../utils/github'

export function deploy(
  request: express.Request,
  response: express.Response
): void {
  // 获取请求参数
  const projectName = request.params.projectName
  const gitUrl = request.body.repository.ssh_url
  const branch = request.body.ref.substring(11)
  // 日志
  console.log('===========================================')
  console.log(new Date().toLocaleString())
  console.log('projectName:', projectName)
  console.log('gitUrl:', gitUrl)
  console.log('branch:', branch)
  ProjectUtil.findProject(projectName).then(project => {
    if (project) {
      // 验证签名
      const payload = JSON.stringify(request.body)
      const sig = request.get('X-Hub-Signature') || ''
      const secret = project.secret
      if (!verifyPostData(payload, sig, secret)) {
        response.json({ code: 4003 })
        return
      }
      // 验证 URL
      if (gitUrl !== project.gitUrl) {
        response.json({ code: 4001 })
        return
      }
      // 验证分支
      if (branch !== project.branch) {
        response.json({ code: 4001 })
        return
      }
      // 开始执行脚本
      console.log('all check has passed')
      const cmd = getCommand(projectName, gitUrl, branch)
      const projectEnv = Object.assign({}, project.projectEnv, process.env)
      child_process.exec(`${cmd}`, { env: projectEnv })
      return response.json({ code: 2000 })
    }
    response.json({ code: 4001 })
  })
}
