import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ShopPage from './pages/shoppage/shop.component';
import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (currentUser == null) {
      unsubscriberFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          userRef.onSnapshot((snapShot) => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data(),
            });
          });
        }
      });
    }
    return () => {
      console.log('cleanup!');
      unsubscriberFromAuth();
    };
  }, []);

  let unsubscriberFromAuth = null;

  return (
    <div>
      <Header currentUser={currentUser} />
      <Routes>
        <Route exact path="" element={<HomePage />} />
        <Route exact path="/shop" element={<ShopPage />}></Route>
        <Route exact path="/signIn" element={<SignInAndSignUpPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
