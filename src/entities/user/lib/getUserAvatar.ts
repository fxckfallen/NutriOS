import { User } from "../model/types";

export const getUserAvatar = (user: User): string => {
    return user.name[0].toUpperCase();
} 