export interface GroceryItem {
    name: string;
    amount: number;
    unit: string; //g, pcs
    price: number;
    currency: 'USD' | 'EUR' | 'RUB';
    category: string;
    checked: boolean;
}