import { messageResponseType } from './messageServiceType';
import { http } from "../http";
import { AxiosResponse } from "axios";

class MessageService {
  async getMessages(data: string | FormData | boolean) {
    const response: AxiosResponse<messageResponseType> = await http.post(
      '',
      data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
    }
    );
    return response.data;
  }
}

export default MessageService;
