import { createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../configure/firebase";

const initialState = {
  user : {
    email: "",
    password: "",
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: ((state, action) => {
        console.log(action.payload)
        createUserWithEmailAndPassword(auth, action.payload.email, action.payload.password)
        .then(() => {
            alert("Registered Successfully");
        })
        .catch((error) => {
            console.log(error.message);
        });
    }),
    signIn : ((state, action) => {
        console.log(action.payload)
       signInWithEmailAndPassword(auth, action.payload.email, action.payload.password)
        .then(() => {
            alert("Login Successfully");
        })
        .catch((error) => {
            console.log(error.message);
        });
    })
  },
})

// Action creators are generated for each case reducer function
export const { signUp, signIn } = authSlice.actions

export default authSlice.reducer