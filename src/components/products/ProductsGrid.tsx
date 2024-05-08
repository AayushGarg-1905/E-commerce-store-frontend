import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { formatAsDollars } from '../../utils'
import { Product } from '../../models/Products.model'


const ProductsGrid = ({products}:{products:Product[]}) => {

  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 '>
      {products.map((product) => {
        const { title, price, image } = product;
        const amount = formatAsDollars(price);

        return (
          <Link to={`/products/${product._id}`} key={product._id}>
            <Card>
              <CardContent className='p-4'>
                <img
                  src={image}
                  alt={title}
                  className='rounded-md h-64 md:h-48 w-full object-cover'
                />
                <div className='mt-4 text-center'>
                  <h2 className='text-xl font-semibold capitalize'>{title}</h2>
                  <p className='text-primary font-light mt-2'>
                    {amount}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductsGrid