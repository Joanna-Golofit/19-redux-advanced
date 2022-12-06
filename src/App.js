import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { uiActions } from './store/ui-slice';

let dontFireUseEffectYet = true;

function App() {
  const cartVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  console.log('cały state tak wyglada', state)

  useEffect(() => {
    if (dontFireUseEffectYet) {
      dontFireUseEffectYet = false; // nie uzywamy useState bo nie chcemy renderowania ponownego
      return;
    }
    dispatch(sendCartData(cart))

  }, [cart, dispatch])

  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {cartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
