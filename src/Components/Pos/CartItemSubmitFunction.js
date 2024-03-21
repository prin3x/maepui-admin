import request from "@/Utils/AxiosUtils";
import { CartItem } from "@/Utils/AxiosUtils/API";

export const CartItemCreateFunction = (createBody) => {
  return await request({
    url: CartItem,
    method: 'post',
    data: createBody,
  });
};
