import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from '../contactsOps';


const initialState = {
  items: [],
  loading: false,
  error: null,
};


const contactsSlice = createSlice({
  name: 'contacts',
  initialState,


  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addMatcher(isAnyOf(fetchContactsThunk.pending, deleteContactThunk.pending, addContactThunk.pending), state => {state.loading = true; state.error = null;})
      .addMatcher(isAnyOf(fetchContactsThunk.rejected, deleteContactThunk.rejected, addContactThunk.rejected), state => {state.loading = false; state.error = true;})
      .addMatcher(isAnyOf(fetchContactsThunk.fulfilled, deleteContactThunk.fulfilled, addContactThunk.fulfilled), state => {state.loading = false;})
  },
});


export const contactsReducer = contactsSlice.reducer;

