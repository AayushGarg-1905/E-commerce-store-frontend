export type ProductsResponse = {
    msg:string,
    data:{
      products: Product[],
      lastFetchedProductId:string,
      firstFetchedProductId:string,
      isLastPage:boolean
    }
  };
export type SingleProductResponse = {
  msg:string
  data:Product;
}

export type FeaturesProductResponse = {
  msg:string;
  data:Product[]
}

export type ProductFilters = {
  msg:string;
  data:ProductFilterData
}

export type ProductFilterData={
    ProductCategories:string[],
    ProductCompanies:string[]
}
  
  export type Product = {
      _id: string;
      category: string;
      company: string;
      createdAt: string;
      description: string;
      featured: boolean;
      image: string;
      price: string;
      publishedAt: string;
      shipping: boolean;
      title: string;
      updatedAt: string;
      colors: string[];
  };
  
  export type ProductsMeta = {
    categories: string[];
    companies: string[];
    pagination: Pagination;
  };
  
  export type Pagination = {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };

  export type Params = {
    search?: string;
    category?: string;
    company?: string;
    order?: string;
    price?: string;
    shipping?: string;
    page?: number;
  };
  
  export type ProductsResponseWithParams = ProductsResponse & { params: Params };

  export enum ProductLayout {
    grid = 'grid',
    list = 'list'
  }