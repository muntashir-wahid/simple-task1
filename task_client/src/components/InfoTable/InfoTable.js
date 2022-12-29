import React, { useState } from "react";
import { toast } from "react-hot-toast";
import UserInfoUpdateModal from "../Modals/UserInfoUpdateModal";
import UserInfo from "./UserInfo";

const InfoTable = ({ userInfos, isLoading, onSuccessfullAction }) => {
  const [updateUser, setUpdateUser] = useState(null);

  const deleteUserHadler = (id) => {
    const userDeletePromise = fetch(
      `https://simple-task-server.vercel.app/api/v1/user-infos/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged && data.deletedCount) {
          onSuccessfullAction();
        }
      });

    toast.promise(userDeletePromise, {
      loading: "Please wait..",
      success: "Your information deleted successfully",
      error: "Error when fetching",
    });
  };

  return (
    <div className="max-w-xl overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sector</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            userInfos.map((info) => (
              <UserInfo
                key={info._id}
                userInfo={info}
                onDeleteUser={deleteUserHadler}
                onUpdateUser={setUpdateUser}
              />
            ))}
        </tbody>
      </table>
      {updateUser && (
        <UserInfoUpdateModal
          user={updateUser}
          setUser={setUpdateUser}
          onSuccessfullUpdate={onSuccessfullAction}
        />
      )}
    </div>
  );
};

export default InfoTable;
