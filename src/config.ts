import Project from './project'

class Config {
  public projects: Project[]

  constructor(plainConfig: Config) {
    this.projects = []
    if (plainConfig.hasOwnProperty('projects')) {
      const plainProjects = plainConfig.projects
      for (const plainProject of plainProjects) {
        const project: Project = {
          projectName: plainProject.projectName,
          gitURL: plainProject.gitURL,
          branch: plainProject.branch || 'master',
          projectEnv: plainProject.projectEnv || {}
        }
        this.projects.push(project)
      }
    }
  }

  public findProject(projectName: string): Project | null {
    if (this.projects) {
      for (const project of this.projects) {
        if (project.projectName === projectName) {
          return project
        }
      }
    }
    return null
  }
}

export default Config
