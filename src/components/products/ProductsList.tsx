import {Card,CardContent} from '@/components/ui/card';
import { Link, } from 'react-router-dom'
import { formatAsDollars } from '../../utils'
import { Product } from '../../models/Products.model'

const ProductsList = ({products}:{products:Product[]}) => {

  return (
    <div className='mt-12 grid gap-y-8'>
      {products.map((product)=>{
        const {title, price, image, company} = product;
        const amount = formatAsDollars(price);
        return <Link key={product._id} to={`/products/${product._id}`}>
            <Card>
              <CardContent className='p-8 gap-y-4 grid md:grid-cols-3 '>
                <img
                  src={image}
                  alt={title}
                  className='h-64 w-full md:h-48  md:w-48  rounded-md object-cover'
                />
                <div>
                  <h2 className='text-xl font-semibold capitalize'>{title}</h2>
                  <h4>{company}</h4>
                </div>
                <p className='text-primary md:ml-auto'>{amount}</p>
              </CardContent>
            </Card>
        </Link>
      })}
    </div>
  )
}

export default ProductsList