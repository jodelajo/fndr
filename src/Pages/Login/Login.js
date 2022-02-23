import Logo from "../../components/Logo/Logo";
import Navbar from "../../components/Navbar/Navbar";
import AdminForm from "../../components/AdminForm/AdminForm";
import "./Login.css";

export default function Login() {
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
