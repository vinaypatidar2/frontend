import {useState, useContext, createContext, useEffect} from 'react';


const CartContext = createContext();

const CartProvider = ({children}) =>{
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        let existingCartItem = localStorage.getItem('cart')
        if (existingCartItem?.length>0)
            setCart(JSON.parse(existingCartItem));
        
    }, [])
    
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

// custom Hook
const useCart = () => useContext(CartContext);

export {useCart, CartProvider};
