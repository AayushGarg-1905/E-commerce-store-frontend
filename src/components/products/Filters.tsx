import { ProductFilterData } from '../../models/Products.model';
// import { Input } from '../ui/input';
import { Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, TextField ,Button } from '@mui/material'
import { useAppSelector } from '@/hooks';


type ProductContainerProps = {
  ProductsFiltersData?: ProductFilterData,
  productSearch:string,
  setProductSearch:React.Dispatch<React.SetStateAction<string>>
  category:string,
  setCategory:React.Dispatch<React.SetStateAction<string>>,
  company:string,
  setCompany:React.Dispatch<React.SetStateAction<string>>,
  freeShipping?:boolean,
  setFreeShipping:React.Dispatch<React.SetStateAction<boolean | undefined>>
  price?:number,
  setPrice:React.Dispatch<React.SetStateAction<number | undefined>>,
  fetchProducts:any,
  handleResetFilter:any,
  setLastFetchedProductId:React.Dispatch<React.SetStateAction<string | undefined>>,

}
const Filters = ({ ProductsFiltersData, productSearch, setProductSearch, category, setCategory, company, setCompany, freeShipping, setFreeShipping, price, setPrice, fetchProducts,handleResetFilter, setLastFetchedProductId }: ProductContainerProps) => {

  const theme = useAppSelector((state)=>state.themeState.theme);

  return (
    <div  className='border rounded-md px-8 py-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center bg-slate-50 '>
      <TextField
        variant='outlined'
        label='search'
        size='small'
        value={productSearch}
        onChange={(e) => setProductSearch(e.target.value)}
      />
      <FormControl size='small' style={{ width: '14rem' }}>
        <InputLabel id="order-return-status-select">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={(e: SelectChangeEvent<string>) => setCategory(e.target.value)}
        >
          {ProductsFiltersData?.ProductCategories ? Object.values(ProductsFiltersData.ProductCategories).map((status,index) => {
            return (<MenuItem value={status} key={index}>{status}</MenuItem>)
          }) : undefined}
        </Select>
      </FormControl>

      <FormControl size='small' style={{ width: '14rem' }}>
        <InputLabel id="order-return-status-select">Company</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={company}
          label="Company"
          onChange={(e: SelectChangeEvent<string>) => setCompany(e.target.value)}
        >
          {ProductsFiltersData?.ProductCompanies ? Object.values(ProductsFiltersData.ProductCompanies).map((status,index) => {
            return (<MenuItem value={status} key={index}>{status}</MenuItem>)
          }) : undefined}
        </Select>
      </FormControl>

      <div style={{display:'flex', alignItems:'center'}}>
          <h2 style={theme!=='light'?{color:'grey'}:{color:'black'}}>Free Shipping</h2>
          
        <Checkbox
        style={{width:'2rem'}}
          // checked={freeShipping}
          onChange={(e)=>setFreeShipping(e.target.checked)}
      />
      </div>

      <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
          <h2 style={theme!=='light'?{color:'grey'}:{color:'black'}}>Price</h2>
          <Slider defaultValue={50} name='Price' aria-label="Default" valueLabelDisplay="auto" min={0} max={20000} step={1000} value={price} onChange={(e,newVal)=>{
            if(e.target){
              setPrice(newVal as number);
            }
          }}/>
      </div>

      <Button type='button' size='small' variant='contained' className='self-end mb-0.5' onClick={()=>{
        setLastFetchedProductId(undefined);
        fetchProducts()
        }}>
        search
      </Button>
      <Button
        type='button'
        size='small'
        variant='outlined'
        className='self-end mb-0.5'
        onClick={()=>{
          handleResetFilter()
          fetchProducts();
        }}
      >
        Reset
      </Button>
    </div>
  )
}

export default Filters