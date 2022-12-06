import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const initialState = {
  items: [],
  totalQuantity: 0,
  // items: [{ id: 'a', title: 'Test Item2', quantity: 1, total: 3.2, price: 3.2 }],
  // totalQuantity: 1,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      state.totalQuantity++;

      console.log("existingItem", existingItem)
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        }) // can only use push with redux toolkit
      } else {
        existingItem.quantity++; // can only use it with redux toolkit
        existingItem.totalPrice += newItem.price; // can only use it with redux toolkit
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id)
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  }
});

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

// export default uiSlice.reducer; // tak tez mozna, wtedy przy imporcie mozna nazwac reducer
export default cartSlice;
export const cartActions = cartSlice.actions;
