import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const UserInfo = ({ userInfo, onDeleteUser, onUpdateUser }) => {
  return (
    <tr className="hover">
      <td>{userInfo.name}</td>
      <td>{userInfo.sector}</td>
      <td className="flex">
        <button onClick={onDeleteUser.bind(null, userInfo._id)}>
          <MdDeleteForever className="text-2xl mr-1" />
        </button>
        <label
          onClick={onUpdateUser.bind(null, userInfo)}
          htmlFor="info-update-modal"
          className="cursor-pointer"
        >
          <BiEdit className="text-2xl" />
        </label>
      </td>
    </tr>
  );
};

export default UserInfo;
