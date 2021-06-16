import express from 'express'
import * as ProjectUtil from '../utils/project'
import child_process from 'child_process'
import getCommand from '../utils/command'
import { verifyPostData } from '../utils/github'
import { Commit } from '../interface/commit'
import { ProjectDeployReq } from './interface'
import { Repository } from '../interface/repository'
import { InvalidParamError } from '../error/InvalidParamError'

export function deploy(
  request: express.Request,
  response: express.Response
): void {
  const {
    projectName,
    branch,
    sshUrl,
    commit
  }: {
    projectName: string
    branch: string
    sshUrl: string
    commit: Commit
  } = getRequestParams(request)
  // 日志
  console.log('===========================================')
  console.log(new Date().toLocaleString())
  console.log('projectName:', projectName)
  console.log('sshUrl:', sshUrl)
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
      if (sshUrl !== project.gitUrl) {
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
      const cmd = getCommand(projectName, sshUrl, branch)
      const projectEnv = Object.assign({}, project.projectEnv, process.env)
      child_process.exec(`${cmd}`, { env: projectEnv })
      return response.json({ code: 2000 })
    }
    response.json({ code: 4001 })
  })
}

const getRequestParams = (
  request: express.Request
): {
  projectName: string
  sshUrl: string
  branch: string
  commit: Commit
} => {
  const params = request.params
  const projectName: string = params.projectName

  const body: ProjectDeployReq = request.body
  const repository: Repository = body.repository
  const sshUrl: string = repository?.ssh_url
  const branch: string = body.ref
  const commits: Commit[] = body.commits || []
  const commit: Commit = commits[0]

  if (!projectName) {
    throw new InvalidParamError('projectName', projectName)
  }
  if (!sshUrl) {
    throw new InvalidParamError('sshUrl', sshUrl)
  }
  if (!branch) {
    throw new InvalidParamError('branch', branch)
  }
  if (!commit) {
    throw new InvalidParamError('commit', commit)
  }

  return {
    projectName,
    sshUrl,
    branch,
    commit
  }
}

const getEnvFromRequest = (request: express.Request) => {}
