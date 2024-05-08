import { CartItem } from "./Cart.model";

export type CheckoutRequestPayload = {
    name: string;
    address: string;
    chargeTotal: number;
    orderTotal: string;
    cartItems: CartItem[];
    numItemsInCart: number;
};

export type CheckoutPageResponse = {
    msg:string
}