import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import supabase from "../supabase";

// -- Thunks
export const fetchPlanets = createAsyncThunk(
  "galaxy/fetchPlanetsByStarId",
  async (starId, {rejectWithValue}) => {
    try {
      let {data, error} = await supabase
        .from("planets")
        .select(
          `*,
          users (
            *
          )`
        )
        .eq("star_id", starId)
        .order("orbit", {ascending: true});

      if (error) {
        throw error;
      }
      console.log("fetched planets...", data);
      return {starId, planets: data};
    } catch (err) {
      console.error("Error fetching planets by star id", err);
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  stars: null,
  // planets: null,
  fetchedPlanets: null,
  loading: false,
  error: null,
};

const galaxySlice = createSlice({
  name: "galaxy",
  initialState,

  reducers: {
    setStars(state, action) {
      state.stars = action.payload;
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
  },

  extraReducers: builder => {
    builder
      .addCase(fetchPlanets.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPlanets.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchedPlanets = action.payload;
        state.error = null;
      })
      .addCase(fetchPlanets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setStars, setPlanets, setLoading, setError} = galaxySlice.actions;

export const getGalaxy = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    let {data, error} = await supabase.from("galaxy").select("*");
    if (error) {
      throw error;
    }
    dispatch(setStars(data));
  } catch (error) {
    dispatch(setError(error.message));
    console.error("Error fetching galaxy", error);
  }
};

export default galaxySlice.reducer;
