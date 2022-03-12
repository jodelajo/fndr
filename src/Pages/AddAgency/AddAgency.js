import AddForm from "../../components/AddForm/AddForm";
import "./AddAgency.css";
import Navbar from "../../components/Navbar/Navbar";
import Logo from "../../components/Logo/Logo";

export default function AddAgency() {
  return (
    <div className="addAgencyWrapper">
      <div className="navLogin">
        <Navbar />
        <Logo />
      </div>
      <div className="agency-form">
        Add an agency
        <AddForm />
      </div>
    </div>
  );
}
