// authSlice.js
import {createSlice} from "@reduxjs/toolkit";
import supabase from "../supabase";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {setUser, setLoading, setError, logout} = authSlice.actions;

// AUTH
export const signIn = (email, password) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    dispatch(setUser(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const signUp = (username, email, password) => async dispatch => {
  dispatch(setLoading(true));
  try {
    const {user, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    if (error) {
      throw error;
    }
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const signOut = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    const {error} = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    dispatch(logout());
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// ACCOUNT OPTIONS
export const getUser =
  (throwError = true) =>
  async dispatch => {
    dispatch(setLoading(true));
    try {
      const {data, error} = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      dispatch(setUser(data));
    } catch (error) {
      dispatch(throwError ? setError(error.message) : setLoading(false));
    }
  };

export const changeUsername = username => async dispatch => {
  dispatch(setLoading(true));
  try {
    const {data, error} = await supabase.auth.updateUser({
      data: {username},
    });
    if (error) {
      throw error;
    }
    dispatch(setUser(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default authSlice.reducer;
