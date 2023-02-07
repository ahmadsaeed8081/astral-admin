import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Modal1 from "../../components/Modal1";
import Modal2 from "../../components/Modal2";

import BonusPopup from "../../components/BounsPopup";
import BonusPopup1 from "../../components/BounsPopup1";

import { cont_address, cont_abi, tokenABI, Token_address } from "../../../src/components/config";
import Web3 from "web3";

const Main = (props) => {
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)

  const [Contract_Funds, set_Contract_Funds] = useState("0");
  const [withdrawn_funds, set_withdrawn_funds] = useState("0");
  const [total_earning, set_total_earning] = useState("");
  const [withdraw, set_withdraw_amount] = useState("0");
  const [total_investors, set_total_investors] = useState("0");
  const [currentRowAdd, set_currentRowAdd] = useState("0");

  


  const [top10_ref, set_top10_ref] = useState([{
    user: "",
    directs: "",
 
  }]);














  useEffect(() => {
    getData();
    console.log("hello oni "+props.address)
  }, [props.provider,props.address]);

  async function getData() {
    if (!props.isWalletConnected) {
      return;
    }
    try {
      const web3 = new Web3(props.provider);

      const accounts = await web3.eth.getAccounts();
      
      const networkId = await web3.eth.net.getId();

      const contract = new web3.eth.Contract(cont_abi, cont_address);
      const contract1 = new web3.eth.Contract(tokenABI, Token_address);

      let top10_info=[{
        user: "",
        directs: "",
        id:","
     
      }];


      let top10;
try{
   top10 = await contract.methods.top10_ref().call({ from: props.address.toString() });

}
catch{

}
console.log("object top10");
console.log("its getting data "+top10[1].directs);

let userId=[];

for(let i=0;i<top10.length;i++)
  {
    console.log("user"+top10[i].user);
    userId[i] = await contract.methods.addresstoId(top10[i].user).call();
    console.log("user"+userId[i]);

  }

  top10_info = top10.map((row,index) => {
    // if(!row[5]){
      console.log("its row "+row);
    return {
      directs: row[1],      
      user: row[0],
      id: userId[index],

    };
    // }
  });

      let Contract_Funds = await contract.methods.get_Contract_Funds().call({ from: props.address.toString() });
      let total_withdrawn_funds = await contract.methods.total_withdrawn_funds().call();
      let total_earning = await contract.methods.Total_earningOf(props.address).call();
      let total_investors = await contract.methods.get_total_inv().call();

      set_withdrawn_funds(total_withdrawn_funds);
      set_Contract_Funds(Contract_Funds)
      set_top10_ref(top10_info)
      set_total_earning(total_earning);
      set_total_investors(total_investors);




console.log("object");

      
    } catch (error) {
      // Catch any errors for any of the above operations.

      console.error(error);
    }
  }

  async function withdraw_funds() {
    if (props.isWalletConnected) {
      try {
        let web3;
        let withdraw1;
        // Get network provider and web3 instance.
        if (props.provider) {
          web3 = new Web3(props.provider);
           withdraw1=web3.utils.toWei(withdraw.toString(),"ether");

        } else {
          alert(
            "its look like you dont have metmask extension installed in you browser"
          );
          return;
        }
        if (Contract_Funds == "0" || Contract_Funds == "") {
          return;
        }
        if (Number(withdraw1)>Number(Contract_Funds)) {
          alert("You dont have"+withdraw1+" to withdraw")
          return;
        }
        
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        // const tokenContract = tokenContractAddress;
        //const investContract = InvestAddress;

        const contract = new web3.eth.Contract(cont_abi, cont_address);
        const result = await contract.methods
          .withdrawFunds(withdraw1)
          .send({ from: accounts[0] });
        if (result) {
          getData();
        }
      } catch (error) {
        // Catch any errors for any of the above operations.
        // alert(
        //   `Failed to load web3, accounts, or contract. Check console for details.`
        // );
        console.error(error);
      }
    } else {
      alert("kindly connect your wallet");
    }
  }


  async function send_bonus(bonusAmount) {
    if (props.isWalletConnected) {
      try {
        let web3;
        // Get network provider and web3 instance.
        if (props.provider) {
          web3 = new Web3(props.provider);
          bonusAmount=web3.utils.toWei(bonusAmount.toString(),"ether");

        } else {
          alert(
            "its look like you dont have metmask extension installed in you browser"
          );
          return;
        }
        if (Contract_Funds == "0" || Contract_Funds == "") {
          return;
        }
        if (Number(bonusAmount)>Number(Contract_Funds)) {
          alert("You dont have"+bonusAmount+" to withdraw")
          return;
        }
        
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        // const tokenContract = tokenContractAddress;
        //const investContract = InvestAddress;
console.log(" bonus add "+currentRowAdd);
        const contract = new web3.eth.Contract(cont_abi, cont_address);



        const result = await contract.methods
          .sendBonus(bonusAmount,currentRowAdd)
          .send({ from: accounts[0] });
        if (result) {
          getData();
        }
      } catch (error) {
        // Catch any errors for any of the above operations.
        // alert(
        //   `Failed to load web3, accounts, or contract. Check console for details.`
        // );
        console.error(error);
      }
    } else {
      alert("kindly connect your wallet");
    }
  }

  async function send_bonus1(id,bonusAmount) {
    console.log("object send bonys 1");
    if (props.isWalletConnected) {

      try {
        let web3;
        // Get network provider and web3 instance.
        if (props.provider) {
          web3 = new Web3(props.provider);

          bonusAmount=web3.utils.toWei(bonusAmount.toString(),"ether");

        } else {
          alert(
            "its look like you dont have metmask extension installed in you browser"
          );
          return;
        }

        if (Number(bonusAmount)>Number(Contract_Funds)) {
          alert("CrowdMatrix doesn't have "+bonusAmount/10**18+" Busd to send bonus")
          return;
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        // const tokenContract = tokenContractAddress;
        //const investContract = InvestAddress;
        const contract = new web3.eth.Contract(cont_abi, cont_address);

        const userAddress = await contract.methods.idtoAddress(id).call();


        const result = await contract.methods
          .sendBonus(bonusAmount,userAddress)
          .send({ from: accounts[0] });
        if (result) {
          getData();
        }
      } catch (error) {
        // Catch any errors for any of the above operations.
        // alert(
        //   `Failed to load web3, accounts, or contract. Check console for details.`
        // );
        console.error(error);
      }
    } else {
      alert("kindly connect your wallet");
    }
  }






  const tableData = [
    {
      userAddress: "000...X11",
      userLink: "000...X21",
   
    }
   
  ];



  const renderColumns = () => {
    return [
      {
        name: "User Address",
        sortable: true,
        grow: 1,
        selector: (row) => row?.user,
      },
      {
        name: "User Id",
        sortable: true,
        grow: 1,
        selector: (row) => row?.id,
      },
      {
        name: "Total Directs",
        sortable: true,
        grow: 1,
        selector: (row) => row?.directs,
      },
      // {
      //   name: "Total Bonus",
      //   sortable: true,
      //   grow: 1,
      //   selector: (row) => row?.bones,
      // },
      {
        name: "Action",
        sortable: true,
        cell: (row) => (
          <div>
            <div
              className="button btn rounded-lg"
              onClick={(e) =>{
                set_currentRowAdd(row?.user);
                setOpen(true)
              } 

              }
            >
              Send Bonus
            </div>
          </div>
        ),
      },
    ];
  };








  return (
    <div className="home-page flex flex-col">
      <div className="wrap wrapWidth">
        <div className="info-wrapper">
          <div className="info-card flex flex-col items-center">
            <div className="icons flex items-center justify-center relative">
              <img src="./images/ellips.png" className="ellips" />
              <img src="./images/icon4.svg" className="icon absolute" />
            </div>
            <div className="card-name flex items-center justify-center flex-col">
              <div className="name">Total Earning</div>
              <div className="amount">${Contract_Funds/10**18+withdrawn_funds/10**18}</div>
            </div>
          </div>
          <div className="info-card flex flex-col items-center">
            <div className="icons flex items-center justify-center relative">
              <img src="./images/ellips.png" className="ellips" />
              <img src="./images/icon5.svg" className="icon absolute" />
            </div>
            <div className="card-name flex items-center justify-center flex-col">
              <div className="name">Current Balance</div>
              <div className="amount">${Contract_Funds/10**18}</div>
            </div>
          </div>

          <div className="info-card flex flex-col items-center">
            <div className="icons flex items-center justify-center relative">
              <img src="./images/ellips.png" className="ellips" />
              <img src="./images/icon6.svg" className="icon absolute" />
            </div>
            <div className="card-name flex items-center justify-center flex-col">
              <div className="name">Total Withdraw</div>
              <div className="amount">${withdrawn_funds/10**18}</div>
            </div>
          </div>
          <div className="info-card flex flex-col items-center">
            <div className="icons flex items-center justify-center relative">
              <img src="./images/ellips.png" className="ellips" />
              <img src="./images/icon6.svg" className="icon absolute" />
            </div>
            <div className="card-name flex items-center justify-center flex-col">
              <div className="name">Total Investors</div>
              <div className="amount">{total_investors}</div>
            </div>
          </div>
          <div className="info-card flex flex-col items-center">
            <div className="icons flex items-center justify-center relative">
              <img src="./images/ellips.png" className="ellips" />
              <img src="./images/icon6.svg" className="icon absolute" />
            </div>
            <div className="card-name flex items-center justify-center flex-col">
              <div className="name">Total Withdraw</div>
              <div className="amount">$0</div>
            </div>
          </div>
          <div className="info-card flex flex-col items-center">
            <div className="icons flex items-center justify-center relative">
              <img src="./images/ellips.png" className="ellips" />
              <img src="./images/icon6.svg" className="icon absolute" />
            </div>
            <div className="card-name flex items-center justify-center flex-col">
              <div className="name">Total Withdraw</div>
              <div className="amount">$0</div>
            </div>
          </div>

        </div>
        <div className="plan-section flex flex-col">
          <div className="Withdraw-box flex items-center">

            <input
            type="number"
            className="txt cleanbtn w-full"
            placeholder="Enter Amount to withdraw"
            value={withdraw}
            onChange={(e) => {
              set_withdraw_amount(e.target.value);
            }}
          />
            <button className="btn button" onClick={withdraw_funds} >Withdraw Funds</button>

          </div>

          <div>
            <div
              className="button btn rounded-lg"
              onClick={(e) =>{
                setOpen1(true)
              } 

              }
            >
              Send Bonus
            </div>
          </div>
          <div className="tbl flex flex-col">
            <DataTable
              columns={renderColumns()}
              data={top10_ref}
              responsive={true}
              pagination={true}
            />
          </div>
        </div>
      </div>
      <Modal1 open={open} onClose={() => setOpen(false)}>
        <BonusPopup currentRowAdd={currentRowAdd} send_bonus={send_bonus} setOpen={setOpen} />
      </Modal1>
      <Modal2 open={open1} onClose={() => setOpen1(false)}>
        <BonusPopup1 send_bonus1={send_bonus1} setOpen1={setOpen1} />
      </Modal2>
    </div>
  );
};

export default Main;
