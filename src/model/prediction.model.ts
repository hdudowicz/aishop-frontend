import { GenerationStatus } from "./generation-status.model"

export interface Prediction {
  id?: number
  createdAt?: Date
  startedAt?: Date
  completedAt?: Date
  status?: GenerationStatus
  prompt?: string
  image?: Uint8Array
  predictTime?: number
  replicateSlug?: string

}

export interface PredictionsDTO {
  predictions?: Prediction[]
}
