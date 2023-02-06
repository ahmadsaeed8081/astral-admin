import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Modal1 from "./Modal1";
import ConnectWallet from "../components/ConnectWallet";
import { cont_address, cont_abi, tokenABI, Token_address } from "./config";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
const Header = (props) => {
  const [openWallet, setOpenWallet] = useState(false);
  const [_address, set_user_address] = useState(null);
  const [_web3, set_web3] = useState(null);

  async function Sign_out() {
    provider = new WalletConnectProvider({
      rpc: {
        56:"https://bsc-dataseed1.binance.org/"
      },
      chainId: 56,
    });
    try {
      await provider.disconnect();
      window.location.reload();
    } catch {}
  }

  async function Connect_Wallet(id) {
    let provider;
    let web3;
    let accounts;

    // const NETWORK_ID = "97";
    // const NETWORK_ID_hex = "0x61";
    const NETWORK_ID = "56";
    const NETWORK_ID_hex = "0x38";
    // set_id(id);
    if (id == "1") {
      //metmask
      provider = window.ethereum;
      console.log("meta and trust provider");
      // alert(provider._metamask);
      console.log(provider.isMetaMask);
      web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      set_web3(web3);

      if (networkId == NETWORK_ID) {
        accounts = await provider.request({ method: "eth_requestAccounts" });
        set_user_address(accounts[0]);
        setOpenWallet(false);
        const contract1 = new web3.eth.Contract(tokenABI, Token_address);

        let balance = await contract1.methods.balanceOf(accounts[0]).call();

        let matic = await web3.eth.getBalance(accounts[0]);
        balance = web3.utils.fromWei(balance, "ether");
        matic = web3.utils.fromWei(matic, "ether");

        props.set_user(accounts[0], web3, provider, balance, matic);

        console.log("object" + matic);
      } else {
        try {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: NETWORK_ID_hex }],
          });
          Connect_Wallet(id);
        } catch {}
      }
    } else if (id == "2") {
      //trust 1Wallet
      provider = new WalletConnectProvider({
        rpc: {
          56:"https://bsc-dataseed1.binance.org/"
        },
        chainId: 56,
      });

      console.log(provider);
      console.log(provider.wc.peerMeta);
      await provider.enable();

      console.log("this is provider");
      console.log(provider.wc.peerMeta.name);

      web3 = new Web3(provider);

      const networkId = await web3.eth.net.getId();
      console.log("yguygy7 " + networkId);
      if (networkId == NETWORK_ID) {
        accounts = await web3.eth.getAccounts();
        set_user_address(accounts[0]);
        setOpenWallet(false);

        const contract1 = new web3.eth.Contract(tokenABI, Token_address);

        let balance = await contract1.methods.balanceOf(accounts[0]).call();

        let matic = await web3.eth.getBalance(accounts[0]);
        balance = web3.utils.fromWei(balance, "ether");
        matic = web3.utils.fromWei(matic, "ether");
        props.set_user(accounts[0], web3, provider, balance, matic);
      }
    } else if (id == "3") {
      //Wallet connect
      provider = new WalletConnectProvider({
        rpc: {
          56:"https://bsc-dataseed1.binance.org/"
        },

        chainId: 56,
      });
      await provider.enable();

      console.log("this is provider");
      console.log(provider.wc.peerMeta);

      web3 = new Web3(provider);

      const networkId = await web3.eth.net.getId();
      console.log("yguygy7 " + networkId);
      if (networkId == NETWORK_ID) {
        accounts = await web3.eth.getAccounts();
        set_user_address(accounts[0]);
        setOpenWallet(false);

        const contract1 = new web3.eth.Contract(tokenABI, Token_address);

        let balance = await contract1.methods.balanceOf(accounts[0]).call();

        let matic = await web3.eth.getBalance(accounts[0]);

        balance = web3.utils.fromWei(balance, "ether");
        matic = web3.utils.fromWei(matic, "ether");

        
        props.set_user(accounts[0], web3, provider, balance, matic);
      } else {
        if (provider.wc.peerMeta.name == "MetaMask") {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x89" }],
          });
          Connect_Wallet(id);
        } else {
          setOpenWallet(false);

          await provider.disconnect();
          alert("Kindly change your network to polygon");
        }
      }
    }
    set_web3(web3);

  }



  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex aic">
        <div className="left flex aic">
          <Link to="/">
            <img src="./images/logo.svg" className="logo-img" />
          </Link>
        </div>
        <div className="right flex justify-end items-center">
        <div className="action flex items-center justify-center">
            {_address == null ? (
              <div
                className="btn-connect button"
                onClick={(e) => {
                  e.stopPropagation();
                  // setOpenWalletList(!openWalletList);
                  setOpenWallet(true);
                }}
              >
                <p>Connect Wallet</p>
              </div>
            ) : (
              <>
                <div
                  className="btn-connect button"
                  onClick={(e) => {
                    Sign_out();
                  }}
                >
                  <p>Sign Out</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal1 open={openWallet} onClose={() => setOpenWallet(false)}>
      <ConnectWallet setOpenWallet={setOpenWallet} Connect_Wallet={Connect_Wallet}/>
      </Modal1>
    </div>
  );
};

export default Header;
