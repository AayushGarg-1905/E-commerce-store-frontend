import { ProductsContainer } from '../components/products'
import { ProductFilterData, ProductFilters } from '../models/Products.model';
import axios from 'axios';
import { baseUrl } from '../utils';
import { useEffect, useState } from 'react';


const Products = () => {
    const [productFiltersData, setProductFiltersData ] = useState<ProductFilterData | undefined>(undefined);

    const fetchProductFiltersData = async()=>{
        const response = await axios.get<ProductFilters>(`${baseUrl}/products/filters`);
        if(response.status === 200){
            setProductFiltersData(response.data.data);
        }
    }
    useEffect(()=>{
        fetchProductFiltersData();
    },[]);
    return (
        <>
        <ProductsContainer ProductsFiltersData={productFiltersData}/>
        </>
    )
}

export default Products