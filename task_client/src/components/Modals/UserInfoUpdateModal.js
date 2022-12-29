import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const UserInfoUpdateModal = ({ user, setUser, onSuccessfullUpdate }) => {
  const [sectors, setSectors] = useState([]);
  const [userName, setUserName] = useState(user.name);
  const [userWork, setUserWork] = useState(user.work);

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  const userWorkChangeHandler = (event) => {
    setUserWork(event.target.value);
  };

  useEffect(() => {
    fetch("https://simple-task-server.vercel.app/api/v1/sectors")
      .then((res) => res.json())
      .then((data) => setSectors(data));
  }, []);

  const updateHandler = (event) => {
    event.preventDefault();

    const updatedUserInfo = {
      name: userName,
      userWork: userWork,
    };

    const userUpdatePromise = fetch(
      `https://simple-task-server.vercel.app/api/v1/user-infos/${user._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedUserInfo),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged && data.modifiedCount) {
          onSuccessfullUpdate();
          setUser(null);
        }
      });

    toast.promise(userUpdatePromise, {
      loading: "Please wait..",
      success: "Your information updated successfully",
      error: "Error when fetching",
    });
  };

  return (
    <Fragment>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="info-update-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="info-update-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>

          <form onSubmit={updateHandler}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input
                type="text"
                name="name"
                onChange={userNameChangeHandler}
                value={userName}
                placeholder={user.name}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Current working sector</span>
              </label>
              <select
                onChange={userWorkChangeHandler}
                name="sector"
                className="select select-bordered w-full"
              >
                {sectors.map((sector) => (
                  <option key={sector._id} value={sector.work}>
                    {sector.work}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control mt-4">
              <input type="submit" value="save" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UserInfoUpdateModal;
