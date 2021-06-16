import { Commit } from '../interface/commit'
import { Repository } from '../interface/repository'

export interface ProjectDeployReq {
  ref: string
  repository: Repository
  commits: Commit[]
}
