import axios from 'axios';
// import {
//   deleteContact,
//   fetchContacts,
//   setErrorStatus,
//   setLoadingStatus,
// } from './contacts/contactsSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
axios.defaults.baseURL = "https://66b36e6b7fba54a5b7ecec9f.mockapi.io/";



export const fetchContactsThunk = createAsyncThunk(
  'fetchContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('contacts');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'deleteContact',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`contacts/${id}`);
      return data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'addContact',
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post('contacts', body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// export const fetchContactsThunk = () => async dispatch => {
//   try {
//     dispatch(setLoadingStatus(true));
//     const response = await axios.get('contacts/fetchAll');
//     console.log(response.data);
//     dispatch(fetchContacts(response.data));
//   } catch (error) {
//     dispatch(setErrorStatus(true));
//   } finally {
//     dispatch(setLoadingStatus(false));
//   }
// };

// export const deleteContactsThunk = id => async dispatch => {
//   try {
//     dispatch(setLoadingStatus(true));
//     await axios.delete('contacts/${id}');
//     dispatch(deleteContact(id));
//   } catch (error) {
//     dispatch(setErrorStatus(true));
//   } finally {
//     dispatch(setLoadingStatus(false));
//   }
// };
