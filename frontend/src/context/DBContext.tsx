import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { translateToEng } from '../translator';
import app from '../firebase';

interface DBContextProviderProps {
  children: ReactNode;
}

export interface ProductInfo {
  date: string;
  company: string;
  count: number;
}

interface Product {
  [date: string]: {
    [company: string]: number;
  };
}

interface Products {
  [productName: string]: Product;
}

interface DBContextType {
  products: Products;
  readDBData: <T>(path: string) => Promise<T | null>;
  update: () => Promise<void>;
}

const useDBContext = createContext<DBContextType | null>(null);

export function DBContextProvider({ children }: DBContextProviderProps) {
  const [products, setProducst] = useState<Products>({});

  useEffect(() => {
    (async function () {
      await update();
    })();
  }, []);

  async function readDBData<T>(path: string): Promise<T | null> {
    const dbRef = ref(getDatabase(app));
    const snapshot = await get(child(dbRef, path));

    if (snapshot.exists()) return snapshot.val();
    else return null;
  }

  async function update() {
    const res = await readDBData<Products>('/');
    let products = {} as Products;
    if (res) {
      for (let product in res) {
        products[translateToEng(product)] = {
          ...res[product],
        };
      }
      console.log('Update DB data:', products);
      setProducst(products);
    }
  }

  return (
    <useDBContext.Provider
      value={{
        products,
        readDBData,
        update,
      }}
    >
      {children}
    </useDBContext.Provider>
  );
}

export function useDB() {
  return useContext(useDBContext);
}
