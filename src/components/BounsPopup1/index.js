import React,{useState} from "react";
import { CloseIcon } from "../../assets";




const BonusPopup1 = ( props ) => {



  const [bonus, set_bonus] = useState("");
  const [address, set_address] = useState("");






  return (
    <div className="bonus-popup flex items-center flex-col">
      <div className="hdr flex items-center justify-end">
        <div
          className="close-icon flex items-center justify-center"
          onClick={(e) => props.setOpen1(false)}
        >
          <CloseIcon />
        </div>
      </div>
      <div className="popup-wrap flex flex-col">
      <input
            type="text"
            className="txt cleanbtn w-full"
            placeholder="Ente id"
            value={address}
            onChange={(e) => {
              set_address(e.target.value);
            }}
          />    
                <input
            type="number"
            className="txt cleanbtn w-full"
            placeholder="Enter Bonus Amount"
            value={bonus}
            onChange={(e) => {
              set_bonus(e.target.value);
            }}
          />     
          <div className="btn button" onClick={()=>props.send_bonus1(address,bonus)}>Send</div>
      </div>
    </div>
  );
};

export default BonusPopup1;