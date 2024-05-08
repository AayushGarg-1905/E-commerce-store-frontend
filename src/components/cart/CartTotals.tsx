import { useAppSelector } from '../../hooks';
import { Card, CardTitle } from '@/components/ui/card';
import { CartTotalRow } from './index'

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useAppSelector((state) => state.cartState
  );

  return (
    <Card className='p-8 bg-muted'>
      <CartTotalRow label='Subtotal' amount={cartTotal} />
      <CartTotalRow label='Shipping' amount={shipping} />
      <CartTotalRow label='Tax' amount={tax} />
      <CardTitle className='mt-8'>
        <CartTotalRow label='Order Total' amount={orderTotal} lastRow />
      </CardTitle>
    </Card>
  );
};


export default CartTotals