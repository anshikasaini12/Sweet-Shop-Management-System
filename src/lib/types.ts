export type Sweet = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageId: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
};
