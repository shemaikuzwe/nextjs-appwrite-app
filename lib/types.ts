import { Models } from "node-appwrite";

export interface Product extends Models.Document {
  name: string;
  price: number;
  image: string;
}

interface Prod {
  name?: string;
  price?: number;
  image?: string;
}
export type Db = {
  create: (payload: Prod, id?: string) => Promise<void>;
  update: (id: string, payload: Prod) => Promise<void>;
  delete: (id: string) => Promise<void>;
  list: () => Promise<Models.DocumentList<Models.Document>>;
  get: (id: string) => Promise<Models.Document>;
};
