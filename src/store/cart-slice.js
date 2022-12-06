import { createSlice } from '@reduxjs/toolkit';

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
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
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

// export default uiSlice.reducer; // tak tez mozna, wtedy przy imporcie mozna nazwac reducer
export default cartSlice;
export const cartActions = cartSlice.actions;
