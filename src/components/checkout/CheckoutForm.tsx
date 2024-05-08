import { SubmitBtn } from "../common"
import { toast } from '@/components/ui/use-toast'
import { useNavigate } from "react-router-dom"
import { baseUrl, formatAsDollars } from '../../utils'
import { clearCart } from '../../features/cart/cartSlice'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckoutPageResponse, CheckoutRequestPayload } from '../../models/Checkout.model'
import { useAppSelector,useAppDispatch } from "../../hooks";
import { useState } from "react";
import axios from "axios"
const CheckoutForm = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [name,setName] = useState('');
    const [address,setAddress] = useState('');

    const user = useAppSelector((state)=>state.userState.user);
    const { cartItems, orderTotal, numItemsInCart } = useAppSelector((state)=>state.cartState);

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!name || !address){
            toast({description:'Please fill all the fields'});
            return;
        }
        if(!user){
            toast({description:'Please login to place order'});
            navigate('/login')
            return;
        }

        const payload:CheckoutRequestPayload = {
            name,
            address,
            chargeTotal: orderTotal,
            orderTotal: formatAsDollars(orderTotal),
            cartItems,
            numItemsInCart
        }

        try{
           const result = await axios.post<CheckoutPageResponse>(`${baseUrl}/create-order`,{data:payload},{
                headers:{
                    Authorization: `Bearer ${user.accessToken}`
                }
            })
            dispatch(clearCart());
            toast({description:result.data.msg})
            navigate('/');
            
        }catch(err){
            toast({description:'Order failed'})
        }
    }

    return (
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <h4 className="font-medium text-xl mb-4">Shipping Information</h4>
            <div className='mb-2'>
                <Label htmlFor='name' className='capitalize'>Name</Label>
                <Input id='name' name='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mb-2'>
                <Label htmlFor='address' className='capitalize'>Address</Label>
                <Input id='address' name='address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <SubmitBtn text='Place Your Order' className='w-full mt-4' />            
        </form>
    )
}

export default CheckoutForm