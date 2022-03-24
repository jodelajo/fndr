import { useState, useContext } from "react";
import axios from "axios";
import { AgencyContext } from "../../context/AgencyContext";
import { AuthContext } from "../../context/AuthContext";
import { APIUrl } from "../../config/config";
import DataForm from "../DataForm/DataForm";

export default function EditForm() {
  const { selectedAgency, setState, state, fetchData, setSelectedAgency } =
    useContext(AgencyContext);
  const { userToken, headers } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [test, settest] = useState();

  const updateData = async (data) => {
    if (!userToken) {
      return;
    }
    try {
      await axios.patch(
        `${APIUrl}/companies/${selectedAgency?.company_id}`,
        data,
        headers
      );
      setSelectedAgency(data);
      // setState(...state, data);
    } catch (e) {
      if (e.request.status === 401) {
        console.log(e.request.response);
        const message = JSON.parse(e.request.response).message._schema;
        setError(message);
        throw new Error(message);
      } else {
        throw new Error(
          "Something went wrong, please visit https://github.com/jodelajo/fndr/issues, and let me know!"
        );
      }
    }
  };
  console.log("sel agency in editform", selectedAgency);
  // console.log("state!!", state);
  return (
    <div>
      <DataForm buttonText="Edit an Agency" submitData={updateData} />
      {error && <p>{error}</p>}
    </div>
  );
}
