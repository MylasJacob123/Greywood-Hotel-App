import { createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../configure/firebase";

const initialState = {
  data: [], 
  bookings: [], 
  favorites: [],
  loading: false,
  error: null,
};

export const dbSlice = createSlice({
  name: "db",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setData(state, action) {
      state.data = action.payload; 
      state.loading = false;
    },
    setBookings(state, action) {
      state.bookings = action.payload; 
      state.loading = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addBookingToState(state, action) {
      state.bookings.push(action.payload); 
      state.loading = false;
    },
    addRoomToState(state, action) {
      state.data.push(action.payload);
      state.loading = false;
    },
    addFavoriteToState(state, action) { 
      state.favorites.push(action.payload); 
      state.loading = false;
    },
    setFavorites(state, action) { 
      state.favorites = action.payload; 
      state.loading = false;
    },
  },
});

// Export actions
export const { setLoading, setData, setBookings, setError, addBookingToState, addRoomToState, addFavoriteToState, setFavorites } = dbSlice.actions;

export default dbSlice.reducer;

export const fetchData = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const querySnapshot = await getDocs(collection(db, "Rooms"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setData(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addBookings = (uid, bookingData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const docRef = await addDoc(collection(db, "users", uid, "bookings"), bookingData);
    console.log("Document written with ID: ", docRef.id);
    dispatch(addBookingToState({ id: docRef.id, ...bookingData }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    const bookingsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setBookings(bookingsData)); 
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getBookings = (uid) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const querySnapshot = await getDocs(collection(db, "users", uid, "bookings"));
    const bookingsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setBookings(bookingsData)); 
  } catch (error) {
    dispatch(setError(error.message));
  }
}

export const addRooms = (roomData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const docRef = await addDoc(collection(db, "Rooms"), roomData);
    console.log("Room added with ID: ", docRef.id);
    dispatch(addRoomToState({ id: docRef.id, ...roomData }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchUser = (uid) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const querySnapshot = await getDocs(collection(db, "users", uid, "profile"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setData(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

//FAVORITES
export const addFavorite = (uid, favoriteData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const globalDocRef = await addDoc(collection(db, "Favorites"), favoriteData);
    console.log("Favorite added to global collection with ID: ", globalDocRef.id);

    const userDocRef = await addDoc(collection(db, "users", uid, "favorites"), favoriteData);
    console.log("Favorite added to user's collection with ID: ", userDocRef.id);

    dispatch(addFavoriteToState({ 
      globalId: globalDocRef.id, 
      userId: userDocRef.id, 
      ...favoriteData 
    }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getFavorites = (uid) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const globalQuerySnapshot = await getDocs(collection(db, "Favorites"));
    const globalFavorites = globalQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const userQuerySnapshot = await getDocs(collection(db, "users", uid, "favorites"));
    const userFavorites = userQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const combinedFavorites = [...globalFavorites, ...userFavorites];

    dispatch(setFavorites(combinedFavorites));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

//For a specific User
export const getUserFavorites = (uid) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const querySnapshot = await getDocs(collection(db, "users", uid, "favorites"));
    const userFavorites = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setFavorites(userFavorites)); 
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const addReviews = (reviewData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const docRef = await addDoc(collection(db, "Reviews"), reviewData);
    console.log("Review added with ID: ", docRef.id);
    dispatch(addRoomToState({ id: docRef.id, ...reviewData }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};