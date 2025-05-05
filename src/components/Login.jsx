import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import { BG_URL, DEFAULT_AVATAR } from "../utils/constants";

const Login = () => {
  const [IsSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSignInForm = () => {
    setIsSignInForm(!IsSignInForm);
  };

  const handleButtonClick = () => {
    const message = validateData(email.current.value, password.current.value);
    setErrMessage(message);
    if (message) return;

    if (!IsSignInForm) {
      // sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: DEFAULT_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          setErrMessage(error.message);
        });
    } else {
      // sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          setErrMessage(error.message);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="absolute bg-black">
        <img
          className="w-full h-screen md:h-auto object-cover md:object-center"
          src={BG_URL}
          alt="bg"
        />
      </div>
      <form
        className="flex flex-col absolute bg-black text-white bg-opacity-50 p-10 rounded-lg w-[80%] md:w-[30%] mx-auto my-32 right-0 left-0 top-15"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl m-2">
          {IsSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!IsSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-2 m-2 border rounded"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email address"
          className="p-2 m-2 border rounded"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 m-2 border rounded"
        />
        <button
          className="p-4 m-2 bg-red-600 rounded"
          onClick={() => handleButtonClick()}
        >
          {IsSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-red-600 m-2 font-bold">{errMessage}</p>
        <div className="m-2 cursor-pointer">
          <p onClick={() => handleSignInForm()}>
            {IsSignInForm
              ? "New to Netflix? Sign Up"
              : "Already have an account? Sign In"}
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
