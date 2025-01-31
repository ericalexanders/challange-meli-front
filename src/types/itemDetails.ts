export interface ItemDetails {
  author: {
    name: string;
    lastname: string;
  };
  item: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: number;
      decimals: number;
    };
    pictures: { secure_url: string }[];
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    description: string;
  };
}
