import React from "react";
import ManageList from "../Manage/ManageList";

function ProductManage() {
  return (
    <div className="admin flex p-6 bg-gray-100 min-h-[85vh]">
      <ManageList />
      <div className="flex-grow"></div>
    </div>
  );
}

export default ProductManage;
