export enum CleaningDelayEnum {
  FOUR_HOURS,
  ONE_HOUR,
  THIRTY_MINUTE,
  DO_NOT_CLEAN,
}

export enum StatusEnum {
  ONLINE,
  IDLE,
  DND,
  OFFLINE,
  MOBILE,
}

export type User = {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  password?: string
  email: string;
  emailVerified?: Date;
  image?: string;
  bio?: string;
  isTwoFactorEnabled: boolean;
  status: StatusEnum;
  cleaningDelay: CleaningDelayEnum;
  createdAt: Date
}

