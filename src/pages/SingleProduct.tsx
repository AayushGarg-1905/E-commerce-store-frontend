import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatAsDollars, baseUrl } from '../utils'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SelectProductColor, SelectProductAmount } from '../components/singleProduct'
import { Product, SingleProductResponse } from '../models/Products.model'
import axios from 'axios';
import {Mode} from '../components/singleProduct/SelectProductAmount'
import { ErrorElement,Loading } from '../components/common'
import { useAppDispatch } from '../hooks';
import { addItem } from '../features/cart/cartSlice'
import { CartItem } from '../models/Cart.model'


const SingleProduct = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    
    const path = location.pathname.split('/');
    const productId = path[path.length-1];
    const [singleProduct, setSingleProduct] = useState<Product | undefined>(undefined);
    const [productColor, setProductColor] = useState('');
    const [amount, setAmount] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSingleProduct = async()=>{
        try{
            const response = await axios.get<SingleProductResponse>(`${baseUrl}/products/${productId}`);
            if(response.status === 200){
                setSingleProduct(response.data.data);
                setIsLoading(false);
            }
        }catch(error){
            setIsLoading(false);   
        }
    }

    useEffect(()=>{
        fetchSingleProduct();
    },[])

    if(isLoading){
        return <Loading/>
    }
    if(!singleProduct){
        return <ErrorElement/>
    }
    const {company, description, image, price, title, colors } = singleProduct;
    const dollarsAmount = formatAsDollars(price);
    
    const cartProduct:CartItem = {
        cartID: singleProduct._id + productColor,
        productID: singleProduct._id,
        image,
        title,
        price,
        amount,
        productColor,
        company,
    }

    const addToCart = () => {
        dispatch(addItem(cartProduct))
    }
    return (
        
        <section>
            <div className='flex gap-x-2 h-6 items-center'>
                <Button asChild variant='link' size='sm'>
                    <Link to='/'>Home</Link>
                </Button>
                <Separator orientation='vertical' />
                <Button asChild variant='link' size='sm'>
                    <Link to='/products'>Products</Link>
                </Button>
            </div>
            {/* PRODUCT */}
            <div className='mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16'>
                <img
                    src={image}
                    alt={title}
                    className='w-96 h-96 object-cover rounded-lg lg:w-full'
                />
                <div>
                    <h1 className='capitalize text-3xl font-bold'>{title}</h1>
                    <h4 className='text-xl mt-2'>{company}</h4>
                    <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>
                        {dollarsAmount}
                    </p>
                    <p className='mt-6 leading-8'>{description}</p>

                    <SelectProductColor
                     colors={colors}
                     currProductColor={productColor}
                    setProductColor={setProductColor}
                    />
                    <SelectProductAmount mode={Mode.SingleProduct} amount={amount} setAmount = {setAmount}/>
                    <Button size='sm' className='mt-10' onClick={addToCart}>
                        Add to cart
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default SingleProduct