import { useState, useContext } from "react";
import axios from "axios";
import { AgencyContext } from "../../context/AgencyContext";
import { AuthContext } from "../../context/AuthContext";
import { APIUrl } from "../../config/config";
import DataForm from "../DataForm/DataForm";

export default function EditForm() {
  const { selectedAgency, setState, state, fetchData } =
    useContext(AgencyContext);
  const { userToken, headers } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [test, settest] = useState();

  const updateData = async (data) => {
    // console.log("data in editform", data.company_id);
    // console.log("sel agency in update", selectedAgency);
    // console.log("state in editform", state.agencies[0].company_id);

    // const agency = state.agencies.find((agency) => {
    //   return agency.company_id === selectedAgency.company_id;
    // });
    // console.log("agency in editform", agency);
    // console.log("test", test);

    // let data = {};

    if (!userToken) {
      return;
    }
    try {
      await axios.patch(
        `${APIUrl}/companies/${selectedAgency?.company_id}`,
        data,
        headers
      );
      // setState(...state);
    } catch (e) {
      if (e.request.status === 400) {
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
  // console.log("state!!", state);
  return (
    <div>
      <DataForm buttonText="Edit an Agency" submitData={updateData} />
      {error && <p>{error}</p>}
    </div>
  );
}
