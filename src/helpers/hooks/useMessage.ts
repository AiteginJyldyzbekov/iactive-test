import { messageType } from '../../store/types';
import { fetchMessages, fetchNewMessages, fetchOldMessages, setAscending, sortArrayByDate } from "../../store/slices/messageSlice";
import { useAppDispatch } from "./hook";

const useMessages = (messages: messageType[]) => {
  const dispatch = useAppDispatch();
  const getFirstMessages = () => {
    const data = new FormData();
    data.append("actionName", "MessagesLoad");
    data.append("messageId", "0");
    dispatch(fetchMessages(data))
  };

  const getNewMessages = () => {
    const lastMessageId = messages?.at(-1)?.id;
    const data = new FormData();
    data.append("actionName", "MessagesLoad");
    data.append("messageId", `${lastMessageId}`);
    dispatch(fetchNewMessages(data))
  };

  const getOldMessages = () => {
    const data = new FormData();
    data.set("actionName", "MessagesLoad");
    data.set("oldMessages", String(true));
    dispatch(fetchOldMessages(data))
  };

  const sortMessages = (sortDirection: string) => {
    switch (sortDirection) {
      case "ASC":
        dispatch(sortArrayByDate({ messages, ascending: false }));
        dispatch(setAscending("ASC"))
        break;
      case "DESC":
        dispatch(sortArrayByDate({ messages, ascending: true }));
        dispatch(setAscending("DESC"))
        break;
      default:
        return messages;
    }
  };

  return { getFirstMessages, getNewMessages, getOldMessages, sortMessages };
};

export default useMessages;
