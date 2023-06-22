export interface RouteType {
  title: string;
  path: string;
  Component: React.FC;
}

export interface positionBtnsType {
  icon: string;
  alt: string;
}

export enum LoadingStatus {
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

export type Loading =
  | LoadingStatus.idle
  | LoadingStatus.failed
  | LoadingStatus.succeeded
  | LoadingStatus.failed;

export type attachmentType = {
  type: string;
  url: string;
};


// UI components types
export interface SelectUiProps {
  showOptions: boolean;
  selectedOption: string;
  handleButtonClick: () => void;
  handleOptionClick: (option: string) => void;
}

export interface BlockCardContainerProps {
  id: string;
  attachments: attachmentType[];
  author: string;
  channel: string;
  content: string;
  date: string;
}

export interface BlockCardUiProps {
  attachments: attachmentType[];
  author: string;
  channel: string;
  content: string;
  isLiked: boolean;
  date: string;
  id: string;
  onAddToFavorite: () => void;
}