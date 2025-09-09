import React, { createContext, useEffect ,useState} from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children}) => {
  const [cartItems, setCartItems] = useState({});
  const url="http://localhost:4000"
  const [token,setToken]=useState("");
  const[food_list,setFoodList] =useState([])

  const addToCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev };
      updated[id] -= 1;
      if (updated[id] === 0) delete updated[id];
      return updated;
    });
  };


  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems)
    {
      if(cartItems[item]>0){
        let itemInfo=food_list.find((product)=>product._id===item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

    const fetchFoodList = async()=>{
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
  }



    useEffect(()=>{
      async function loadData(){
        await fetchFoodList();
      
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
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
