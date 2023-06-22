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