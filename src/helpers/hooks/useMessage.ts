import { messageType } from '../../store/types';
import { getMessages, getNewMessages, getOldMessages, setAscending, sortArrayByDate } from "../../store/slices/messageSlice";
import { useAppDispatch } from "./hook";

const useMessages = (messages: messageType[]) => {
  const dispatch = useAppDispatch();
  const getFirstMessages = () => {
    const data = new FormData();
    data.append("actionName", "MessagesLoad");
    data.append("messageId", "0");
    dispatch(getMessages(data))
    console.log(messages)
  };

  const getNewMessage = () => {
    const lastMessageId = messages?.at(-1)?.id;
    const data = new FormData();
    data.append("actionName", "MessagesLoad");
    data.append("messageId", `${lastMessageId}`);
    dispatch(getNewMessages(data))
  };

  const getOldMessage = () => {
    const data = new FormData();
    data.set("actionName", "MessagesLoad");
    data.set("oldMessages", String(true));
    dispatch(getOldMessages(data))
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

  return { getFirstMessages, getNewMessage, getOldMessage, sortMessages };
};

export default useMessages;
