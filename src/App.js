/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./css/App.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
// import Sidebar from "./components/Sidebar";
import Main from "./Pages/Home";



function App() {


  const [address, set_address] = useState(null);
const [web3, set_web3] = useState(null);
const [provider, set_provider] = useState(null);
// import React, { useState, useEffect } from "react";

const [isWalletConnected, set_isWalletConnected] = useState(false);
const [balance, setBalance] = useState(0);
const [matic, set_matic] = useState(0);

function set_user(_add,_provider,_web3,balance,matic){
  console.log("ihjono "+_add)
  set_address(_add)

  set_isWalletConnected(true);
  set_provider(_provider);
  set_web3(_web3);
set_matic(matic)
setBalance(balance)
console.log("ihjono "+address)

}



  return (
    <div className="App">
      <Header set_user={set_user} />
      <Routes>
      <Route exact path="/" element={<Main web3={web3} provider={provider} isWalletConnected={isWalletConnected}  matic={matic} balance={balance} address={address} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
