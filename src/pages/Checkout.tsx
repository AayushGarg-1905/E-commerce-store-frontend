import { useAppSelector } from "../hooks";
import { toast } from '../components/ui/use-toast'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CartTotals } from '../components/cart';
import { SectionTile } from '../components/landing';
import {CheckoutForm} from '../components/checkout';
const Checkout = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state)=>state.userState.user);
    const cartTotal = useAppSelector((state)=>state.cartState.cartTotal);

    useEffect(()=>{
        if(!user){
            toast({description:'Please Login to continue'});
            navigate('/login');
            return;
        }
    },[])

    if(cartTotal === 0){
        return <SectionTile text="Your cart is empty"/>
    }

    return (
        <>
            <SectionTile text='Place your order' />
            <div className='mt-8 grid gap-8  md:grid-cols-2 items-start'>
                <CheckoutForm />
                <CartTotals />
            </div>
    </>
    )
}

export default Checkout