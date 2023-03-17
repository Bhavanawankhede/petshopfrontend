import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../MyComponents/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { StoreItem } from "../MyComponents/StoreItem"
import axios from "axios"
//orignal 

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  petId: number
  quantity: number
}
type WishItem = {
  id: number
  like: number
}

type ShoppingCartContext = {
  openCart: () => void
  openWish: () => void
  closeCart: () => void
  // getItemLike: (id: number) => number;
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  wishlistIncrease: (id: any) => void
  wishlistDecrease: (id: any) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  // hideStoreItem: () => void
  cartQuantity: number
  wishItems: WishItem[]
  cartItems: CartItem[]
  wishQuantity:number 
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  // const [isStoreItemvisible, setisStoreItemvisible] = useState(true);
  
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )
  const [wishItems, setWishItems] = useLocalStorage<WishItem[]>(
    "wishItem",
    []
  )

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const wishQuantity = wishItems.reduce(
    (like, item) => item.like + like,
    0
  )

  

  const openCart = () =>  setIsOpen(true)
  const openWish = () =>  setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  // const hideStoreItem = () => setisStoreItemvisible(false);
  
  function getItemQuantity(id: number) {
    return cartItems.find(item => item.petId === id)?.quantity || 0
  }

  // function getItemLike(id: number) {
  //   // return wishItems.find((item) => item.id === id)?.like || 0;
  //   setWishItems(wishItems => {
  //     if (wishItems.find(item => item.id === id) == null) {
  //       return [...wishItems, { id, quantity: 1 }]
  //     } 
  //   }
  // }

  function increaseCartQuantity(petId: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.petId === petId) == null) {
        return [...currItems, { petId, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.petId === petId) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })

  }


  function wishlistIncrease(id: any) {
    console.log("wishlist items");
    setWishItems(WishItem => {
      if (WishItem.find(item => item.id === id) == null) {
        return [...WishItem, { id, like: 1 }]
      } else {
        return WishItem.map(item => {
          if (item.id === id) {
            return item  //error
          } else {
            return item
          }
        })
      }
    })
    localStorage.setItem("favouriteId",id);
    console.log(wishItems);
  }

  function wishlistDecrease(id: any) {
    console.log("wishlist items");
    setWishItems(WishItem => {
      if (WishItem.find(item => item.id === id)?.like === 1) {
        return WishItem.filter(item => item.id !== id)
      } else {
        return WishItem.map(item => {
          if (item.id === id) {
            return {...id, like: id.like - 1}
          } else {
            return id
          }
        })
      }
    })
    localStorage.setItem("favouriteId",id);
    console.log(wishItems);
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.petId === id)?.quantity === 1) {
        return currItems.filter(item => item.petId !== id)
      } else {
        return currItems.map(item => {
          if (item.petId === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.petId !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        wishlistIncrease,
        wishlistDecrease,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        openWish,
        closeCart,
        // hideStoreItem,
        cartItems,
        wishItems,  // error 
        cartQuantity,
        wishQuantity
      }}
    >
      {children}
      {/* <ShoppingCart isOpen={isOpen}/> */}
    </ShoppingCartContext.Provider>
  )
}
