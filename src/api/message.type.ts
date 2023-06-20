import { AxiosResponse } from "axios";
import { messageType } from "../store/types";

type messageResponseType = {
  Messages: messageType[];
  dislikeImages: [];
  likeImages: [];
};

export type getMessagesType = (
  data: FormData
) => Promise<AxiosResponse<messageResponseType> | undefined>;
