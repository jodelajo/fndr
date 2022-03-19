import { useState, useContext } from "react";
import axios from "axios";
import { AgencyContext } from "../../context/AgencyContext";
import { AuthContext } from "../../context/AuthContext";
import { APIUrl } from "../../config/config";
import DataForm from "../DataForm/DataForm";
import "./EditForm.css";

export default function EditForm() {
  const { selectedAgency } = useContext(AgencyContext);
  const { userToken, headers } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [state, setState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function submitData() {
    if (userToken) {
      const patchUrl = axios.patch(
        `${APIUrl}/companies/${selectedAgency?.company_id}`,
        state,
        headers
      );
      try {
        await patchUrl;
      } catch (e) {
        if (e.request.status === 401) {
          const message = JSON.parse(e.request.response).message;
          setError(message);
          throw new Error(message);
        } else {
          throw new Error(
            "Something went wrong, please visit https://github.com/jodelajo/fndr/issues, and let me know!"
          );
        }
      }
    } else {
      return;
    }
  }

  async function submitUpdate(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitData(state);
    } catch (error) {
      console.log("submit error", error);
    }
    setIsLoading(false);
    window.location.reload(false);
  }

  function onChangeHandler(e) {
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  }

  return (
    <div>
      <DataForm
        onSubmit={submitUpdate}
        onChangeHandler={onChangeHandler}
        isLoading={isLoading}
        required={false}
        buttonText="Edit an Agency"
        register=""
        state={state}
      />
    </div>
  );
}
