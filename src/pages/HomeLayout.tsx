import { Navbar } from '@/components/navbar'
import { Header } from '@/components/header'
import { Outlet,useNavigation } from 'react-router-dom'
import { Loading } from '../components/common';

const HomeLayout = () => {

    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';

    return (
        <>
            <Header/>
            <Navbar/>
            <div className='align-element py-20'>
                {isPageLoading ? <Loading/> : <Outlet/>}
            </div>
            
        </>
    )
}

export default HomeLayout