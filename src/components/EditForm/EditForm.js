import { useState, useContext } from "react";
import axios from "axios";
import { AgencyContext } from "../../context/AgencyContext";
import { AuthContext } from "../../context/AuthContext";
import { APIUrl } from "../../config/config";
import DataForm from "../DataForm/DataForm";

export default function EditForm() {
  const { selectedAgency } = useContext(AgencyContext);
  const { userToken, headers } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const updateData = async (state) => {
    console.log("state in editform", state);
    console.log("sel agency in update", selectedAgency);

    let data = {};

    if (!userToken) {
      return;
    }
    try {
      await axios.patch(
        `${APIUrl}/companies/${selectedAgency?.company_id}`,
        state,
        headers
      );
    } catch (e) {
      if (e.request.status === 400) {
        console.log(e.request.response);
        const message = JSON.parse(e.request.response).message;
        setError(message);
        throw new Error(message);
      } else {
        throw new Error(
          "Something went wrong, please visit https://github.com/jodelajo/fndr/issues, and let me know!"
        );
      }
    }
  };

  return (
    <div>
      <DataForm buttonText="Edit an Agency" submitData={updateData} />
      {error && <p>{error}</p>}
    </div>
  );
}
