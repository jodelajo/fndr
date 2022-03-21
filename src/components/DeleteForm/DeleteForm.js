import { useContext, useState } from "react";
import axios from "axios";
import { APIUrl } from "../../config/config";
import { AuthContext } from "../../context/AuthContext";
import { AgencyContext } from "../../context/AgencyContext";

export default function DeleteForm() {
  const { userToken, headers } = useContext(AuthContext);
  const { selectedAgency } = useContext(AgencyContext);
  const [error, setError] = useState(null);

  const deleteData = async (state) => {
    console.log("state in editform", state);
    console.log("sel agency in update", selectedAgency);
    if (!userToken) {
      return;
    }
    try {
      await axios.delete(
        `${APIUrl}/companies/${selectedAgency?.company_id}`,
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
  return <div></div>;
}
