
export const formatAsDollars = (price: string | number): string =>{
    const dollarAmount = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD'
    }).format(Number(price)/100);

    return dollarAmount;
}

export const maxAmountOfProductsInProductsPage = 10;
export const shippingFee = 500   //  divide by 100 
export const TaxPercent = 0.1

export const guestUserCredentials = {
    email:'test@test.com',
    password:'secret'
}

export const baseUrl = 'https://e-commerce-store-backend-byrk.onrender.com/api/v1'