import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const InfoForm = ({ onSaveInfo }) => {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    fetch("https://simple-task-server.vercel.app/api/v1/sectors")
      .then((res) => res.json())
      .then((data) => setSectors(data));
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const sector = form.sector.value;
    const info = { name, sector };
    const saveUserPromise = fetch(
      "https://simple-task-server.vercel.app/api/v1/user-infos",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(info),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          onSaveInfo();
          form.reset();
        }
      });

    toast.promise(saveUserPromise, {
      loading: "Please wait..",
      success: "Your information saved successfully",
      error: "Error when fetching",
    });
  };

  return (
    <div className="max-w-xl bg-base-300 p-8 shadow-xl rounded-lg">
      <form onSubmit={submitHandler}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Ex: John Doe"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Current working sector</span>
          </label>
          <select name="sector" className="select select-bordered w-full">
            {/* <option value="first">Han Solo</option> */}
            {sectors.map((sector) => (
              <option key={sector._id} value={sector.work}>
                {sector.work}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-1">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              required
            />
            <span className="label-text">Agree the Terms</span>
          </label>
        </div>
        <div className="form-control">
          <input type="submit" value="save" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default InfoForm;
