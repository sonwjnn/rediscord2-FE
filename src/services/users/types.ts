import { CleaningDelayEnum, StatusEnum } from "@/types/user"

export type UpdateUserType = {
  firstName?: string | null
  lastName?: string | null
  image?: string | null
  bio?: string | null
  emailVerified?: Date | null
  status?: StatusEnum
  cleaningDelay?: CleaningDelayEnum
  password?: string | null
}