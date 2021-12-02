import React, { useState, createContext, useEffect } from 'react'
import { db } from '../firebase/config'

export const productContext = createContext()

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const sub = db.collection('myproducts').onSnapshot((snapshot) => {
      let items = []
      snapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data(),
        })
        setProducts(items)
      })

      console.log(products)
    })
    return sub
    // eslint-disable-next-line
  }, [])
  return (
    <productContext.Provider value={{ products }}>
      {children}
    </productContext.Provider>
  )
}
