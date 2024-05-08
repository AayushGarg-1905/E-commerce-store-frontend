import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast'
import { SubmitBtn } from '../components/common'
import { loginUser } from '../features/user/userSlice';
import { useAppDispatch } from '../hooks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { baseUrl,guestUserCredentials } from '@/utils'
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const response = await axios.post(`${baseUrl}/auth/login`,{
                email: email,
                password: password
            })
            const { username, accessToken } = response.data.data;
            dispatch(loginUser({username,accessToken}));
            navigate('/');
        }catch(err){
            toast({description:'Login failed'})
        }
    }

    const loginAsGuestUser = async()=>{
        try{
            const response = await axios.post(`${baseUrl}/auth/login`,{
                email: guestUserCredentials.email,
                password: guestUserCredentials.password
            })
            const { username, accessToken  } = response.data.data; 
            dispatch(loginUser({username,accessToken}));
            navigate('/');
        }catch(err){
            toast({description:'Login failed'})
        }
    }

    return (
        <section className='h-screen grid place-items-center'>
            <Card className='w-96 bg-muted'>
                <CardHeader>
                    <CardTitle className='text-center'>
                        Login
                    </CardTitle>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-2'>
                                <Label htmlFor='identifier' className='capitalize'>Email</Label>
                                <Input id='identifier' name='identifier' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <Label htmlFor='password' className='capitalize'>Password</Label>
                                <Input id='password' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <SubmitBtn text='Login' className='w-full mt-4' />
                            <Button
                                type='button'
                                variant='outline'
                                onClick={loginAsGuestUser}
                                className='w-full mt-4'
                            >
                                Guest User
                            </Button>
                            <p className='text-center mt-4'>
                                Not a member yet ?<Button type='button' asChild variant='link'>
                                    <Link to='/register'>Register</Link>
                                </Button>
                            </p>
                        </form>
                    </CardContent>
                </CardHeader>
            </Card>
        </section>
    )
}

export default Login