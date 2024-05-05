import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import supabase from "../supabase";

// -- Thunks
export const fetchUser = createAsyncThunk(
  "users/fetchById",
  async (userId, {rejectWithValue}) => {
    try {
      let {data, error} = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        throw error;
      }
      console.log("fetched user...", data);
      return data;
    } catch (err) {
      console.error("Error fetching user", err);
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  users: null,
  fetchedUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
      state.error = null;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    resetFetchedUser(state) {
      state.fetchedUser = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setUsers, setLoading, setError, resetFetchedUser} =
  userSlice.actions;

export const getUsers = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    let {data, error} = await supabase.from("users").select("*");
    if (error) {
      throw error;
    }
    console.log({data, error});
    dispatch(setUsers(data));
  } catch (error) {
    dispatch(setError(error.message));
    console.error(error);
  }
};

/**
 * Accepts an object and updates the user
 *
 * @param {object} fields an object with updated fields. non-updating fields do not have to be included
 * @param {uuid} userId the id of the user to edit. must be same as authenticated user
 * @returns nothing lmao
 */
export const updateUser =
  ({fields, userId}) =>
  async dispatch => {
    dispatch(setLoading(true));
    try {
      let {data, error} = await supabase
        .from("users")
        .update(fields)
        .eq("id", userId)
        .select("*");
      if (error) {
        throw error;
      }
      console.log("Success updating username, returned: ", data);
      dispatch(setUsers(data));
    } catch (error) {
      dispatch(setError(error.message));
      console.error(error);
    }
  };
// ---

export default userSlice.reducer;
