import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ManageList from "./Manage/ManageList";


function Admin() {
  

  return (
    <div className="admin flex p-6 bg-gray-100 min-h-[85vh]">
      <ManageList />
      <div className="text-center flex flex-grow items-center justify-center font-bold text-2xl">Hello Admin</div>
    </div>
  );
}

export default Admin;
