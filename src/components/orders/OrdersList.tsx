import { Order } from '../../models/Order.model'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const OrderList = ({allUserOrders}:{allUserOrders:Order[]}) => {
  return (
    <div className='mt-16'>
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className='w-[100px]'>Products</TableHead>
            <TableHead className='w-[100px]'>Cost</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUserOrders.map((order,index) => {
            const { name, address, numItemsInCart, orderTotal, createdAt } =
              order;
            return (
              <TableRow key={index}>
                <TableCell>{name}</TableCell>
                <TableCell>{address}</TableCell>
                <TableCell className='text-center'>{numItemsInCart}</TableCell>
                <TableCell>{orderTotal}</TableCell>
                <TableCell>{new Date(createdAt).toDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrderList