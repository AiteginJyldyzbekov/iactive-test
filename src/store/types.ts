import { attachmentType } from "../types/types";

export type messageType = {
  attachments: Array<attachmentType>;
  author: string;
  channel: string;
  content: string;
  date: string;
  id: string;
  region: string;
  senderNumber: string;
};
