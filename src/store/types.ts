// Message types
type attachmentType = {
  type: string;
  url: string;
};

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