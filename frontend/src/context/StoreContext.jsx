import React, { createContext, useEffect ,useState} from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children}) => {
  const [cartItems, setCartItems] = useState({});
  const url="http://localhost:4000"
  const [token,setToken]=useState("");
  const[food_list,setFoodList] =useState([])

  // const addToCart = async(itemId)=>{
  //   if(!cartItems[itemId]){
  //     setCartItems((prev)=>({...prev,[itemId]:1}))
  //   }
  //   else{
  //     setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
  //   }
  //   if(token){
  //     await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
  //   }
  // }


  // const removeFromCart =async (itemId) => {
  //     setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  //   if(token){
  //     await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
  //   }
  // }

  const addToCart = async (itemId) => {
  if (!cartItems[itemId]) {
    setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  } else {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }

  if (token) {
    await axios.post(
      url + "/api/cart/add",
      { itemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
};

const removeFromCart = async (itemId) => {
  setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  if (token) {
    await axios.post(
      url + "/api/cart/remove",
      { itemId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
};



  // const getTotalCartAmount=()=>{
  //   let totalAmount=0;
  //   for(const item in cartItems)
  //   {
  //     if(cartItems[item]>0){
  //       let itemInfo=food_list.find((product)=>product._id===item);
  //       totalAmount += itemInfo.price * cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // }
  const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const itemInfo = food_list.find((product) => product._id === item);
      if (itemInfo) { // <-- safety check
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
  }
  return totalAmount;
};


    const fetchFoodList = async()=>{
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  }

    const loadCartData = async (token) => {
  try {
    const response = await axios.post(
      url + "/api/cart/get",
      {}, // request body
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCartItems(response.data.cartData);
  
  } catch (error) {
    console.error("Failed to load cart:", error.response || error.message);
  }
};




    useEffect(()=>{
      async function loadData(){
        await fetchFoodList();
      
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      } 
      }
      loadData();
  },[])

     useEffect(()=>{
    async function loadData(){
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
       
      }
    }
    loadData()

  },[])
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url, 
    token,
    setToken
  };



  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
