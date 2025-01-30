interface Author {
  name: string;
  lastname: string;
}

interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
}

export interface DataResponse {
  author: Author;
  categories: string[]; // Array de strings
  items: Item[]; // Array de objetos Item
}
