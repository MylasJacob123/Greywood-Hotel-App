import { createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from '../configure/firebase';

const initialState = {
  user: null,
  loading: false,
  error: null,
  logged: false, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.logged = true; 
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.logged = false;
      localStorage.removeItem("user"); 
    },
    initializeUser(state) {
      const userData = localStorage.getItem("user");
      if (userData) {
        state.user = JSON.parse(userData);
        state.logged = true; 
      }
    },
  },
});

// Export actions
export const { setLoading, setUser, setError, logout, initializeUser } = authSlice.actions;

export const signUp = ({ email, password, firstName, lastName }) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const docRef = await addDoc(collection(db, "users", userCredential.user.uid, "profile"), {
      firstName,
      lastName,
      email,
      role: "client",
    });
    dispatch(setUser({ uid: userCredential.user.uid, email }));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const signIn = ({ email, password }) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (email === "hoteladmin@gmail.com" && password === "admin@123") {
      dispatch(setUser({ uid: userCredential.user.uid, email: userCredential.user.email, isAdmin: true }));
      return { isAdmin: true }; 
    } else {
      dispatch(setUser({ uid: userCredential.user.uid, email: userCredential.user.email, isAdmin: false }));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const resetPassword = ({ email }) => async (dispatch) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent.");
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    await auth.signOut(); 
    dispatch(logout());
    alert("You have been logged out successfully.")
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};

export default authSlice.reducer;
