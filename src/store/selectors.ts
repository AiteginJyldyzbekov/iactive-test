import { useAppSelector } from "../hooks/hook";

export const useSelectorMessages = () =>
  useAppSelector((state) => state.messageSlice);