export interface Commit {
  id: string
  message: string
  timestamp: string
  url: string
  committer: Committer
  added: string[]
  removed: string[]
  modified: string[]
}

export interface Committer {
  name: string
  email: string
  username: string
}
