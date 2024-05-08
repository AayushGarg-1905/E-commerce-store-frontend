import { useNavigate } from "react-router-dom";
import { toast } from '@/components/ui/use-toast';
import { OrdersList } from '../components/orders'
import { SectionTile } from '../components/landing'
import { Order, OrdersResponse } from '../models/Order.model'
import axios from "axios";
import { baseUrl } from "@/utils";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks";
import { Button } from "@/components/ui/button";


const Orders = () => {

  const user = useAppSelector((state)=>state.userState.user);
  const navigate = useNavigate();
  const [allUserOrders, setAllUserOrders] = useState<Order[]>([]);
  const [lastFetchedOrderId, setLastFetchedOrderId] = useState<string | undefined>(undefined);
  const [firstFetchedOrderId, setFirstFetchedOrderId] = useState<string | undefined>(undefined);
  const [disableNextBtn, setDisableNextBtn] = useState<boolean>(false);

  const fetchUserOrders = async(direction?:string)=>{

    if(!user){
      toast({description:'Login Required'});
      navigate('/login');
      return;
    }
    let queryParams:any = {};
    if(direction==='next'){
        if(lastFetchedOrderId){
            queryParams.lastFetchedOrderId = lastFetchedOrderId;
        }
    }
    else if(direction==='prev'){
      if(firstFetchedOrderId){
        queryParams.firstFetchedOrderId = firstFetchedOrderId;
      }
    }
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await axios.get<OrdersResponse>(`${baseUrl}/orders?${queryString}`,{
      headers:{
        Authorization: `Bearer ${user.accessToken}`
    }
    });
    if(response.status === 200){
      setAllUserOrders(response.data.data.orders);
      setLastFetchedOrderId(response.data.data.lastFetchedOrderId);
      setFirstFetchedOrderId(response.data.data.firstFetchedOrderId);
      setDisableNextBtn(response.data.data.isLastPage);
    }
  }

  const handlePagination = async()=>{
    if(disableNextBtn===true){
        toast({description:'No more Orders available'})
        return;
    }
    fetchUserOrders('next');
}

const handlePrevPagination = async()=>{
  fetchUserOrders('prev');
}

  useEffect(()=>{
    fetchUserOrders();
  },[])

  if(allUserOrders.length==0){
    return <SectionTile text='Please make an order' />;
  }
  return (
    <>
      <SectionTile text='Your Orders' />
      <OrdersList allUserOrders={allUserOrders}/>
      {/* <PaginationContainer /> */}

      <div className='gap-6 mt-7 flex justify-between'>
      <Button variant='outline' size='lg' onClick={handlePrevPagination}>Prev</Button>
      <Button variant='outline' size='lg' onClick={handlePagination}>Next</Button>
    </div>
    </>
  );
}

export default Orders