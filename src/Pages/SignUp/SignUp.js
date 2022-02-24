import Logo from "../../components/Logo/Logo";
import Navbar from "../../components/Navbar/Navbar";
import AdminForm from "../../components/AdminForm/AdminForm";
import "../Login/Login.css";

export default function SignUp() {
  return (
    <div className="generalLogin">
      <div className="navLogin">
        <Navbar />
        <Logo />
      </div>
      <div className="mainLogin">
        <AdminForm />
      </div>
    </div>
  );
}
