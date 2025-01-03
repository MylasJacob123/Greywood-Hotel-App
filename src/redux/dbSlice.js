import { createSlice } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../configure/firebase";

const initialState = {
  data: [], 
  bookings: [], 
  favorites: [],
  reviews: [],
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
    clearLoading(state) {
      state.loading = false;
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
    updateRoomInState(state, action) {
      const index = state.data.findIndex(room => room.id === action.payload.id);  
      if (index !== -1) {
        state.data[index] = action.payload; 
      }
      state.loading = false;
    },
    deleteRoomFromState(state, action) {
      state.data = state.data.filter(room => room.id !== action.payload);
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
    removeFavoriteFromState(state, action) {
      state.favorites = state.favorites.filter(fav => fav.roomType !== action.payload.roomType);
    },
    setReviews(state, action) {
      state.loading = false;
      state.reviews = action.payload; 
    },
    deleteBookingFromState(state, action) {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload); 
      state.loading = false;
    }
  },
});

// Export actions
export const { setLoading, clearLoading, setData, setBookings, setError, addBookingToState, addRoomToState, updateRoomInState, deleteRoomFromState, addFavoriteToState, setFavorites,  removeFavoriteFromState, setReviews, deleteBookingFromState } = dbSlice.actions;

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
    const userDocRef = await addDoc(collection(db, "users", uid, "bookings"), bookingData);
    console.log("User booking document written with ID: ", userDocRef.id);

    const globalDocRef = await addDoc(collection(db, "bookings"), { ...bookingData, userId: uid });
    console.log("Global booking document written with ID: ", globalDocRef.id);

    dispatch(addBookingToState({ id: userDocRef.id, ...bookingData, globalId: globalDocRef.id }));
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
// export const addFavorite = (uid, favoriteData) => async (dispatch, getState) => {
//   const state = getState();
//   const existingFavorite = state.db.favorites.find(fav => fav.roomType === favoriteData.roomType);
  
//   dispatch(setLoading());
//   try {
//     if (existingFavorite) {
//       dispatch(removeFavoriteFromState(favoriteData));
//     } else {
//       const globalDocRef = await addDoc(collection(db, "Favorites"), favoriteData);
//       console.log("Favorite added to global collection with ID: ", globalDocRef.id);

//       const userDocRef = await addDoc(collection(db, "users", uid, "favorites"), favoriteData);
//       console.log("Favorite added to user's collection with ID: ", userDocRef.id);

//       dispatch(addFavoriteToState({ 
//         globalId: globalDocRef.id, 
//         userId: userDocRef.id, 
//         ...favoriteData 
//       }));
//     }
//   } catch (error) {
//     dispatch(setError(error.message));
//   }
// };
export const addFavorite = ({ uid, favoriteData }) => async (dispatch, getState) => {
  dispatch(setLoading());
  try {
    const querySnapshot = await getDocs(collection(db, "users", uid, "favorites"));
    const existingFavorites = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const duplicate = existingFavorites.find(
      (fav) => fav.roomType === favoriteData.roomType
    );

    if (duplicate) {
      throw new Error("This room is already in your favorites.");
    }

    const docRef = await addDoc(collection(db, "users", uid, "favorites"), favoriteData);

    dispatch(addFavoriteToState({ id: docRef.id, ...favoriteData }));
    dispatch(clearLoading());
  } catch (error) {
    dispatch(setError(error.message));
    throw error; 
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


//Reviews
export const addReviews = (reviewData) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "Reviews"), reviewData);
    dispatch(addBookingToState({ id: docRef.id, ...reviewData }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getReviews = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const querySnapshot = await getDocs(collection(db, "Reviews")); 
    const reviewsArray = [];
    querySnapshot.forEach((doc) => {
      reviewsArray.push({ id: doc.id, ...doc.data() });
    });
    dispatch(setReviews(reviewsArray));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteRoom = (uid) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const roomRef = doc(db, "Rooms", uid);
    await deleteDoc(roomRef);
    dispatch(deleteRoomFromState(uid)); 
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateRoom = (uid, data) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const docRef = doc(db, "Rooms", uid);
    await updateDoc(docRef, data); 

    dispatch(updateRoomInState({ id: uid, ...data }));

    console.log("Room updated with ID: ", uid);
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteBooking = (uid) => async (dispatch) => {
  try {
    dispatch(setLoading());  
    const roomRef = doc(db, "bookings", uid);
    await deleteDoc(roomRef);
    dispatch(deleteRoomFromState(uid));  
    dispatch(setLoading(false));  
  } catch (error) {
    dispatch(setError(error.message)); 
    dispatch(setLoading(false));  
  }
};