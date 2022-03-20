import { useState, useContext } from "react";
import "./AddForm.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { APIUrl } from "../../config/config";
import DataForm from "../DataForm/DataForm";

export default function AddForm() {
  const [error, setError] = useState(null);
  const { userToken, headers } = useContext(AuthContext);

  const postData = async (data) => {
    if (!userToken) {
      return;
    }
    if (userToken) {
      try {
        const response = await axios.post(`${APIUrl}/companies`, data, headers);
        const content = response.data;
        console.log("content", content);
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
    }
  };

  return (
    <>
      <DataForm buttonText="Add an Agency" submitData={postData} />
      {error && <p>{error}</p>}
    </>
  );
}
