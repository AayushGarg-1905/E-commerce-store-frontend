import { CartItem } from "./Cart.model";
import { Pagination } from "./Products.model";

export type Order = {
    id: string;
    address: string;
    cartItems: CartItem[];
    createdAt: string;
    name: string;
    numItemsInCart: number;
    orderTotal: string;
    publishedAt: string;
    updatedAt: string;
  };

  export type OrdersData = {
    orders:Order[],
    lastFetchedOrderId:string,
    firstFetchedOrderId:string,
    isLastPage:boolean
  }
  
  export type OrdersMeta = {
    pagination: Pagination;
  };
  
  export type OrdersResponse = {
    msg:string,
    data: OrdersData;
  };