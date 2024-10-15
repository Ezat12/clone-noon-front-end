import React from "react";
import ListAccount from "../ListAccount/ListAccount";
// import img_account from "../../assets/account.png";

function Account() {
  return (
    <div className="account flex ">
      <ListAccount />
      <div className="flex-1 flex items-center justify-center">
        <img src={""} alt="" />
      </div>
    </div>
  );
}

export default Account;
