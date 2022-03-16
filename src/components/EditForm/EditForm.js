import { useState, useContext } from "react";
import { AgencyContext } from "../../context/AgencyContext";
import DataForm from "../DataForm/DataForm";
import "./EditForm.css";

export default function EditForm() {
  const { submitData, state, onChangeHandler } = useContext(AgencyContext);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
      <DataForm
        onSubmit={submitUpdate}
        onChangeHandler={onChangeHandler}
        isLoading={isLoading}
        required={false}
        buttonText="Edit an Agency"
        register=""
      />
    </div>
  );
}
