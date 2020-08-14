interface Project {
  projectName: string
  gitURL: string
  branch: string
  projectEnv: NodeJS.ProcessEnv
}

export default Project
