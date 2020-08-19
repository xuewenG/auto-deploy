import Project from '../model/project'
import { queryOne } from '@ixuewen/mysql-util'

export async function findProject(projectName: string): Promise<Project> {
  const sql = 'SELECT * FROM project WHERE projectName=?'
  const project = await queryOne<Project>(sql, projectName)
  project.projectEnv = JSON.parse((project.projectEnv as unknown) as string)
  return project
}
