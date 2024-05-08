import { Link} from 'react-router-dom'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { baseUrl } from '@/utils'
import { useNavigate } from 'react-router-dom'
import {SubmitBtn} from '../components/common';

const Register = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { username, email, password }
        try {
            await axios.post(`${baseUrl}/auth/register`, data);
            toast({ description: 'Registered' });
            navigate('/login')
        } catch (error) {
            const errorMsg = error instanceof AxiosError ? error.response?.data.error.message
                : 'Registration Failed';
            toast({ description: errorMsg });
        }
    }

    return (
        <section className='h-screen grid place-items-center'>
            <Card className='w-96 bg-muted'>
                <CardHeader>
                    <CardTitle className='text-center'>Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-2'>
                            <Label htmlFor='username' className='capitalize'>Username</Label>
                            <Input id='username' name='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='mb-2'>
                            <Label htmlFor='email' className='capitalize'>Email</Label>
                            <Input id='email' name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='mb-2'>
                            <Label htmlFor='password' className='capitalize'>Password</Label>
                            <Input id='password' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <SubmitBtn text='Register' className='w-full mt-4'/>
                        <p className='text-center mt-4'>
                            Already a member?<Button type='button' asChild variant='link'>
                                <Link to='/login'>Login</Link>
                            </Button>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}

export default Register