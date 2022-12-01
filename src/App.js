import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function App() {
  const cartVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const state = useSelector(state => state);

  console.log('cały state tak wyglada', state)

  useEffect(() => {
    fetch('https://http-5fa63-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
      method: "PUT",
      body: JSON.stringify(cart)
    })
    // first
  
    // return () => {
    //   second
    // }
  }, [cart])
  

  return (
    <Layout>
      {cartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
