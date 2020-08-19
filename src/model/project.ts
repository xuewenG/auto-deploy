interface Project {
  id: number
  projectName: string
  gitUrl: string
  branch: string
  secret: string
  projectEnv: NodeJS.ProcessEnv
  createTime: Date
  updateTime: Date
}

export default Project
