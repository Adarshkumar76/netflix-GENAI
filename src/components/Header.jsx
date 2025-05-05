import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../slices/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../slices/configSlice";
import { toggleGenAISearch } from "../slices/genAiSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGenAISearch = useSelector((store) => store.genai.showGenAISearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unSubscribe();
  }, []);

  const handleGenAISearchClick = () => {
    dispatch(toggleGenAISearch());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <>
      <div className="absolute px-15 w-screen bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center">
        <img className="h-20 mx-auto md:mx-0" src={LOGO} alt="logo" />
        {user && (
          <div className="flex p-2">
            {showGenAISearch && (
              <select
                className="p-2 bg-gray-500 text-white rounded-lg "
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              className="text-white px-5 cursor-pointer bg-red-700 mx-5 rounded-lg hover:bg-red-800"
              onClick={() => handleGenAISearchClick()}
            >
              {showGenAISearch ? "HomePage" : "GenAI Search"}
            </button>
            <img className="h-10" src={user?.photoURL} alt="user" />
            <button
              className="font-bold text-white px-3 cursor-pointer"
              onClick={() => handleSignOut()}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
