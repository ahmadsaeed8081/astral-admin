import React,{useState} from "react";
import { CloseIcon } from "../../assets";




const BonusPopup = ( props ) => {



  const [bonus, set_bonus] = useState("");





  return (
    <div className="bonus-popup flex items-center flex-col">
      <div className="hdr flex items-center justify-end">
        <div
          className="close-icon flex items-center justify-center"
          onClick={(e) => props.setOpen(false)}
        >
          <CloseIcon />
        </div>
      </div>
      <div className="popup-wrap flex flex-col">
      <input
            type="number"
            className="txt cleanbtn w-full"
            placeholder="Enter Bonus Amount"
            value={bonus}
            onChange={(e) => {
              set_bonus(e.target.value);
            }}
          />        <div className="btn button" onClick={()=>props.send_bonus(bonus)}>Send</div>
      </div>
    </div>
  );
};

export default BonusPopup;
