import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice'; //nazwa zalezy ode mnie
import uiSlice from './ui-slice'; //nazwa zalezy ode mnie, bo default export

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer
  }
});


export default store;