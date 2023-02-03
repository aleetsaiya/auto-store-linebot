import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { translateToEng } from '../translator';
import app from '../firebase';

const useDBContext = createContext();

export function DBContextProvider({ children }) {
  const [products, setProducst] = useState({});

  useEffect(() => {
    (async function () {
      const res = await readDBData('/');
      let processData = {};
      for (let product in res) {
        processData[translateToEng(product)] = {
          ...res[product],
        };
      }
      console.log({ processData });
      setProducst(processData);
    })();
  }, []);

  async function readDBData(path) {
    const dbRef = ref(getDatabase(app));
    const snapshot = await get(child(dbRef, path));

    if (snapshot.exists()) return snapshot.val();
    else return {};
  }

  return (
    <useDBContext.Provider
      value={{
        products,
        readDBData,
      }}
    >
      {children}
    </useDBContext.Provider>
  );
}

export function useDB() {
  return useContext(useDBContext);
}
