export default interface ProjectDetail {
  id: number
  loaded: boolean
  title?: string
  enDescription?: string
  zhDescription?: string
  imagePath?: string
  website?: string
  github?: string
}

export const InitProjectDetail: ProjectDetail = {
  id: 0,
  loaded: false
}
