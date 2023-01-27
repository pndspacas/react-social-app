import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Auth } from "firebase/auth";

interface CreateFormData {
  title: string;
  description: string;
}

const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/posts");
  };

  const [values, setValues] = useState({
    username: user?.displayName,
    email: "",
    password: "",
  });

  const register = async () => {
    const result = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    console.log(result);
    navigate("/posts");
  };

  const login = async () => {
    const result = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    console.log(result);
    navigate("/posts");
  };

  const [isLogin, setLogin] = useState(false);
  const [isRegister, setRegister] = useState(false);

  const handleClickLogin = () => {
    setLogin(!isLogin);
  };
  const handleClickRegister = () => {
    setRegister(!isRegister);
  };

  return (
    <div>
      {!user! && (
        <div className="wrapper">
          <div className="container">
            <div className="tabs">
              <button className="sign_in_li" onClick={handleClickLogin}>
                Sign in
              </button>
              <button className="sign_up_li" onClick={handleClickRegister}>
                Sign up
              </button>
            </div>

            <div className={isLogin ? "hidden" : "sing_in"}>
              <div className="icon-button">
                <span className="google" onClick={signInWithGoogle}>
                  <i className="fa-brands fa-google"></i>
                </span>
              </div>
              <div className="input_field">
                <input type="text" placeholder="E-mail" className="input" />
              </div>
              <div className="input_field">
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                />
              </div>
              <div className="btn-container">
                <button className="btn" onClick={login}>
                  Sign in
                </button>
              </div>
            </div>

            <div className={isRegister ? "sign_up" : "hidden"}>
              <div className="input_field">
                <input
                  type="text"
                  placeholder="Username"
                  className="input"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="input_field">
                <input
                  type="text"
                  placeholder="E-mail"
                  className="input"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="input_field">
                <input
                  type="password"
                  placeholder="Password"
                  className="input"
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="btn-container">
                <button className="btn" onClick={register}>
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
