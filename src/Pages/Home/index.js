import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Modal1 from "../../components/Modal1";
import BonusPopup from "../../components/BounsPopup";
import { cont_address, cont_abi, tokenABI, Token_address } from "../../../src/components/config";
import Web3 from "web3";

const Main = (props) => {
  const [open, setOpen] = useState(false)
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



  const [planer, set_upliner] = useState("0");
  const [global_earning, set_global_earning] = useState("");
  const [level_earning, set_level_earning] = useState("");
  const [current_plan, set_current_plan] = useState("NAN")
  
  const [fee, set_fee] = useState("");

  const [direct_ref, set_direct_ref] = useState("");


  const [is_paid, set_paid] = useState(false);
  const [is_gloabl_plan1_paid, set_global_plan1_paid] = useState(false);
  const [is_gloabl_plan2_paid, set_global_plan2_paid] = useState(false);
  const [is_gloabl_plan3_paid, set_global_plan3_paid] = useState(false);

  const [is_gloabl_plan4_paid, set_global_plan4_paid] = useState(false);
  const [is_gloabl_plan5_paid, set_global_plan5_paid] = useState(false);
  const [is_gloabl_plan6_paid, set_global_plan6_paid] = useState(false);
  
  const [is_gloabl_plan7_paid, set_global_plan7_paid] = useState(false);
  const [is_gloabl_plan8_paid, set_global_plan8_paid] = useState(false);
  const [is_gloabl_plan9_paid, set_global_plan9_paid] = useState(false);
  const [is_gloabl_plan10_paid, set_global_plan10_paid] = useState(false);


  const [is_levelpaid, set_levelpaid] = useState(false);

  



  const [add, set_add] = useState(false);
  const [plane1_data, set_plane1_data] = useState([]);
  const [plane2_data, set_plane2_data] = useState([]);
  const [plane3_data, set_plane3_data] = useState([]);

  const [plane4_data, set_plane4_data] = useState([]);
  const [plane5_data, set_plane5_data] = useState([]);
  const [plane6_data, set_plane6_data] = useState([]);
  
  const [plane7_data, set_plane7_data] = useState([]);
  const [plane8_data, set_plane8_data] = useState([]);
  const [plane9_data, set_plane9_data] = useState([]);
  const [plane10_data, set_plane10_data] = useState([]);









  useEffect(() => {
    getData();
    console.log("hello "+props.address)
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

      const fee1 = await contract.methods.reg_fee().call();
      const fee_paid = await contract.methods.is_paid(props.address).call();

      const level = await contract.methods.is_levelMatrix_bought(props.address).call();

      // const global1 = await contract.methods.is_globalMatrix_bought(0,props.address).call();
      // const global2 = await contract.methods.is_globalMatrix_bought(1,props.address).call();
      // const global3 = await contract.methods.is_globalMatrix_bought(2,props.address).call();
      // const global4 = await contract.methods.is_globalMatrix_bought(3,props.address).call();
      // const global5 = await contract.methods.is_globalMatrix_bought(4,props.address).call();
      // const global6 = await contract.methods.is_globalMatrix_bought(5,props.address).call();
      // const global7 = await contract.methods.is_globalMatrix_bought(6,props.address).call();
      // const global8 = await contract.methods.is_globalMatrix_bought(7,props.address).call();
      // const global9 = await contract.methods.is_globalMatrix_bought(8,props.address).call();
      // const global10 = await contract.methods.is_globalMatrix_bought(9,props.address).call();

      let top10;
try{
   top10 = await contract.methods.top10_ref().call({ from: props.address.toString() });

}
catch{

}
      console.log("its get data");

      let Contract_Funds = await contract.methods.get_Contract_Funds().call({ from: props.address.toString() });
      let total_withdrawn_funds = await contract.methods.total_withdrawn_funds().call();
      let total_earning = await contract.methods.Total_earningOf(props.address).call();
      let total_investors = await contract.methods.get_total_inv().call();

      set_withdrawn_funds(total_withdrawn_funds);
      set_Contract_Funds(Contract_Funds)
      set_top10_ref(top10)
      set_total_earning(total_earning);
      set_total_investors(total_investors);


      console.log("its getting data");

      // set_global_plan1_paid(global1)
      // set_global_plan2_paid(global2)

      // set_global_plan3_paid(global3)
      // set_global_plan4_paid(global4)
      // set_global_plan5_paid(global5)
      // set_global_plan6_paid(global6)
      // set_global_plan7_paid(global7)
      // set_global_plan8_paid(global8)

      // set_global_plan9_paid(global9)

      // set_global_plan10_paid(global10)


      // set_levelpaid(level)


      // set_add(accounts[0]);
 
      
      // set_fee(fee1);
      // let data = await contract.methods.data(0,props.address).call({ from: props.address.toString() });
      // set_plane1_data(data);
      // let data1 = await contract.methods.data(1,props.address).call({ from: props.address.toString() });
      //  set_plane2_data(data1);
      //  let data2 = await contract.methods.data(2,props.address).call({ from: props.address.toString() });
      //  set_plane3_data(data2);


      //  let data3 = await contract.methods.data(3,props.address).call({ from: props.address.toString() });
      //  set_plane4_data(data3);
       
      //  let data4 = await contract.methods.data(4,props.address).call({ from: props.address.toString() });
      //  set_plane5_data(data4);

      //  let data5 = await contract.methods.data(5,props.address).call({ from: props.address.toString() });
      //  set_plane6_data(data5);

      //  let data6 = await contract.methods.data(6,props.address).call({ from: props.address.toString() });
      //  set_plane7_data(data6);
       
      //  let data7 = await contract.methods.data(7,props.address).call({ from: props.address.toString() });
      //  set_plane8_data(data7);

      //  let data8 = await contract.methods.data(8,props.address).call({ from: props.address.toString() });
      //  set_plane9_data(data8);

      //  let data9 = await contract.methods.data(9,props.address).call({ from: props.address.toString() });
      //  set_plane10_data(data9);



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
        name: "Total Earning",
        sortable: true,
        grow: 1,
        selector: (row) => row?.invest,
      },
      {
        name: "Total Directs",
        sortable: true,
        grow: 1,
        selector: (row) => row?.directs,
      },
      {
        name: "Total Bonus",
        sortable: true,
        grow: 1,
        selector: (row) => row?.bones,
      },
      {
        name: "Status",
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
    </div>
  );
};

export default Main;
