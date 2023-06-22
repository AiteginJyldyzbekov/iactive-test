import { useAppSelector } from "../helpers/hooks/hook";

export const useSelectorMessages = () =>
  useAppSelector((state) => state.messageSlice);