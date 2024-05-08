import { formatAsDollars } from '../../utils'
import { Separator } from '@/components/ui/separator'

type CartTotalRowProps = {
    label:string;
    amount:number;
    lastRow?:boolean
}

const CartTotalRow = ({label,amount,lastRow}:CartTotalRowProps)=> {
    return (
      <>
        <p className='flex justify-between text-sm'>
          <span>{label}</span>
          <span>{formatAsDollars(amount)}</span>
        </p>
        {lastRow ? null : <Separator className='my-2' />}
      </>
    );
  }

  export default CartTotalRow;