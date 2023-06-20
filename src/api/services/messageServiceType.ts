import { messageType } from "../../store/types";

export type messageResponseType = {
  Messages: messageType[];
  dislikeImages: [];
  likeImages: [];
};