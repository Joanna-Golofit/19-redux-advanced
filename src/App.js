import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';

let dontFireUseEffectYet = true;

function App() {
  const cartVisible = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  console.log('cały state tak wyglada', state)

  useEffect(() => {
    // deklaracja funkcji
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      }))
      const response = await fetch(
        'https://http-5fa63-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: "PUT",
          body: JSON.stringify(cart)
        }
      );

      if (!response.ok) {

        throw new Error('Sending cart data failed');  // can dispatch here instead of error message but would be better to catch when function is executed so more type of errors can be caught
      }
      // const responseData = await response.json(); // we,re not getting back anything, just sending so we don't need this bit

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!'
      }));
    };

    if (dontFireUseEffectYet) {
      dontFireUseEffectYet = false; // nie uzywamy useState bo nie chcemy renderowania ponownego
      return;
    }

    //uruchamiam zadeklarowana wyzej funkcje pod warunkiem, ze dontFireUseEffectYet juz sie ustawil na false, zapobiega to wysylaniu pustego stanu do firebase
    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!'
      }));
    });

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
