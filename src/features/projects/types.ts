export type Project = {
  id: string
  name: string
  userId: string
  json: string
  height: number
  width: number
  thumbnailUrl?: string
  isTemplate?: boolean
  isPro?: boolean
  createdAt: Date
  updatedAt: Date
}

export type CreateProjectRequest = {
  name: string
  json: string
  height: number
  width: number
}

export type GetMyProjectsRequest = {
  page: number
  limit: number
}

export type GetMyProjectsResponse = {
  data: Project[]
  nextPage: number | null
}

export type GetTemplatesRequest = {
  page: number
  limit: number
}

export type GetTemplatesResponse = {
  data: Project[]
  nextPage: number | null
}
