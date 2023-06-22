import dayjs from "dayjs";

export const getMessageTime = (date: string) => dayjs(date).format("HH:mm");