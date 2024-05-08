import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {toast} from '@/components/ui/use-toast'
import { shippingFee,TaxPercent } from '../../utils'
import { CartItem, CartState  } from '../../models/Cart.model' 

  
  
const initialState:CartState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: shippingFee,
    tax: 0,
    orderTotal: 0,
}

const getCartFromLocalStorage = (): CartState => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : initialState;
  };

const cartSlice = createSlice({
    name: 'cart',
    initialState:getCartFromLocalStorage(),
    reducers:{
        addItem:(state,action:PayloadAction<CartItem>)=>{
            const newCartItem = action.payload;
            const item = state.cartItems.find((item)=>item.cartID === newCartItem.cartID);

            if(item){
                item.amount = item.amount + newCartItem.amount;
            }
            else{
                state.cartItems.push(newCartItem);
            }
            state.numItemsInCart += newCartItem.amount;
            state.cartTotal += Number(newCartItem.price)*newCartItem.amount;
            cartSlice.caseReducers.calculateTotals(state);
            toast({description:'item added to cart'});
        },
        clearCart:()=>{
            localStorage.setItem('cart',JSON.stringify(initialState));
            return initialState;
        },
        removeItem:(state, action: PayloadAction<string>)=>{
            const cartID = action.payload;
            const cartItem = state.cartItems.find((item) => item.cartID === cartID);
            if (!cartItem){
                return;
            }

            state.cartItems = state.cartItems.filter((item) => item.cartID !== cartID);
            state.numItemsInCart -= cartItem.amount;
            state.cartTotal -= Number(cartItem.price) * cartItem.amount;
            cartSlice.caseReducers.calculateTotals(state);
            toast({ description: 'Item removed from the cart' });
        },
        editItem:(state,action:PayloadAction<{cartID:string,amount:number}>)=>{
            const { cartID, amount } = action.payload;
            const cartItem = state.cartItems.find((item) => item.cartID === cartID);
            if (!cartItem){
                return;
            }

            state.numItemsInCart += amount - cartItem.amount;
            state.cartTotal += Number(cartItem.price) * (amount - cartItem.amount);
            cartItem.amount = amount;
            cartSlice.caseReducers.calculateTotals(state); 
            toast({ description: 'Amount updated' });
        },
        calculateTotals:(state)=>{
            state.tax = TaxPercent * state.cartTotal;
            state.orderTotal = state.cartTotal + state.shipping + state.tax;
            localStorage.setItem('cart', JSON.stringify(state));
        }
    }
})

export const {addItem, clearCart, removeItem, editItem, calculateTotals} = cartSlice.actions

export default cartSlice.reducer