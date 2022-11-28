import { createSlice } from '@reduxjs/toolkit';

const initialUiState = {
  cartIsVisible: false,
}
const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible
    },
  }
});

// export default uiSlice.reducer; // tak tez mozna, wtedy przy imporcie mozna nazwac reducer
export default uiSlice;
export const uiActions = uiSlice.actions;
