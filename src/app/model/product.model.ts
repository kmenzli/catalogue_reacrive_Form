export interface Product {
    
    id: string,
    name: string,
    price: number,
    promotion: boolean
}
export interface PageProduct {
    content : Product[];
    page: number;
    size: number;
    total: number;
}
