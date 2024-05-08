import { ProductsList, ProductsGrid, Filters} from './index'
import { useEffect, useState } from "react"
import { LayoutGrid, List } from "lucide-react"
import { ProductsResponse,ProductLayout, Product, ProductFilterData } from '../../models/Products.model'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator';
import axios from "axios"
import { baseUrl } from "@/utils"
import { toast } from '../ui/use-toast'

type ProductContainerProps = {
  ProductsFiltersData?:ProductFilterData
}

const ProductsContainer = ({ ProductsFiltersData }:ProductContainerProps) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [productSearch, setProductSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [price,setPrice] = useState<number | undefined>(undefined);
  const [freeShipping,setFreeShipping] = useState<boolean | undefined>(undefined);
  const [lastFetchedProductId, setLastFetchedProductId] = useState<string | undefined>(undefined);
  const [firstFetchedProductId, setFirstFetchedProductId] = useState<string | undefined>(undefined);
  const [disableNextBtn, setDisableNextBtn] = useState<boolean>(false);
  

  const createQueryParams = ()=>{
    let queryParams:any = {};
    if(productSearch){
      queryParams.search = productSearch;
    }
    if(category!==''){
      queryParams.category = category;
    }
    if(company!==''){
      queryParams.company = company;
    }
    if(price!==undefined){
      queryParams.price = price;
    }
    if(freeShipping!==undefined){
      queryParams.shipping = freeShipping
    }
    return queryParams;
  }
  const fetchProducts = async(direction?:string)=>{
    let queryParams:any = createQueryParams();
    if(direction==='next'){
        if(lastFetchedProductId){
            queryParams.lastFetchedProductId = lastFetchedProductId;
        }
    }
    else if(direction==='prev'){
      if(firstFetchedProductId){
        queryParams.firstFetchedProductId = firstFetchedProductId;
      }
    }
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await axios.get<ProductsResponse>(`${baseUrl}/products?${queryString}`);
    if(response.status === 200){
      setProducts(response.data.data.products);
      setLastFetchedProductId(response.data.data.lastFetchedProductId);
      setFirstFetchedProductId(response.data.data.firstFetchedProductId);
      setDisableNextBtn(response.data.data.isLastPage);
    }
  }

  const handlePagination = async()=>{
      if(disableNextBtn===true){
          toast({description:'No more products available'})
          return;
      }
      fetchProducts('next');
  }

  const handlePrevPagination = async()=>{
    fetchProducts('prev');
  }

  const handleResetFilter = ()=>{
    setProductSearch('');
    setCategory('');
    setCompany('');
    setFreeShipping(undefined);
    setPrice(undefined);
    setLastFetchedProductId(undefined);
  }

  useEffect(()=>{
    fetchProducts();
  },[]);

  const [layout,setLayout] = useState<ProductLayout>(ProductLayout.grid);

  return (
    <>
     <Filters ProductsFiltersData={ProductsFiltersData} productSearch={productSearch} setProductSearch={setProductSearch} category={category} setCategory={setCategory} company={company} setCompany={setCompany} freeShipping={freeShipping} setFreeShipping={setFreeShipping} price={price} setPrice={setPrice} fetchProducts={fetchProducts} handleResetFilter={handleResetFilter} setLastFetchedProductId={setLastFetchedProductId}/>
     {console.log('price is ',price)}
    <section>
      <div className='flex justify-between items-center mt-8 '>
        <h4 className='font-medium text-md'>
          {products.length} product{products.length > 1 && 's'}
        </h4>
        <div className='flex gap-x-4'>
          <Button
            onClick={() => setLayout(ProductLayout.grid)}
            variant={layout === ProductLayout.grid ? 'default' : 'ghost'}
            size='icon'
          >
            <LayoutGrid />
          </Button>
          <Button
            onClick={() => setLayout(ProductLayout.list)}
            size='icon'
            variant={layout === ProductLayout.list ? 'default' : 'ghost'}
          >
            <List />
          </Button>
        </div>
      </div>
      <Separator className='mt-4' />
    </section>

    <div>
      {products.length === 0 ? (
        <h5 className='text-2xl mt-16'>
          Sorry, no products matched your search...
        </h5>
      ) : layout === ProductLayout.grid ? (
        <ProductsGrid products={products} />
      ) : (
        <ProductsList products={products}/>
      )}
    </div>
      
    <div className='gap-6 mt-7 flex justify-between'>
      <Button variant='default' size='lg' onClick={handlePrevPagination}>Prev</Button>
      <Button variant='default' size='lg' onClick={handlePagination}>Next</Button>
    </div>
  </>
  )
}

export default ProductsContainer