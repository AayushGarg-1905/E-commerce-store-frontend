import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAppSelector,useAppDispatch } from '../../hooks';
import {clearCart} from '../../features/cart/cartSlice';
import {logoutUser} from '../../features/user/userSlice';
import {toast} from '@/components/ui/use-toast';
import axios from 'axios';
import { baseUrl } from '@/utils';
const Header = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state)=>state.userState.user);

    const handleLogout = async() => {
        await axios.post(`${baseUrl}/auth/logout`,{},{
            headers:{
                Authorization:`Bearer ${user?.accessToken}`
            }
        })
        dispatch(clearCart());
        dispatch(logoutUser());
        toast({description:'Logged Out'})
        navigate('/');
    }
    return (
        <header>
            <div className='align-element flex justify-center sm:justify-end py-2'>
                {user?.username?<div className='flex gap-x-2 sm:gap-x-8 items-center'>
                    <p className='text-xs sm:text-sm'>Hello, {user.username}</p>
                    <Button variant='link' size='sm' onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
                :
                <div className='flex gap-x-6 justify-center items-center -mr-4'>
                    <Button asChild variant='link' size='sm'>
                        <Link to='/login'>Sign in / Guest</Link>
                    </Button>
                    <Button asChild variant='link' size='sm'>
                        <Link to='/register'>Register</Link>
                    </Button>
                </div>}
            </div>
        </header>
    )
}

export default Header