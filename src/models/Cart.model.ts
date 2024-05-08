export type CartItem = {
    cartID: string;
    productID: string;
    image: string;
    title: string;
    price: string;
    amount: number;
    productColor: string;
    company: string;
  };
  
export type CartState = {
    cartItems: CartItem[];
    numItemsInCart: number;
    cartTotal: number;
    shipping: number;
    tax: number;
    orderTotal: number;
  };