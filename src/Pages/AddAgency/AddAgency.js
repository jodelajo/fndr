import AddForm from "../../components/AddForm/AddForm";
import "./AddAgency.css";

import HeaderSmall from "../../components/HeaderSmall/HeaderSmall";

export default function AddAgency() {
  return (
    <div className="generalLogin">
      <HeaderSmall />
      <div className="agency-form">
        <AddForm />
      </div>
    </div>
  );
}
