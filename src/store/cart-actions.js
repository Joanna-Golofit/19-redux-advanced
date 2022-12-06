import { uiActions } from './ui-slice';

export const sendCartData = (cart) => {
  // in redux we can use a function that returns another function.. as action
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data!'
    }));

    const sendRequest = async () => {
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
    }

    try {
      await sendRequest();

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!'
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!'
      }));
    }

  }
}