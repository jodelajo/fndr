import Logo from "../../components/Logo/Logo";
import Navbar from "../../components/Navbar/Navbar";
import AuthForm from "../../components/AuthForm/AuthForm";
import "./Login.css";

export default function Login() {
  return (
    <div className="generalLogin">
      <div className="navLogin">
        <Navbar />
        <Logo />
      </div>
      <div className="mainLogin">
        <AuthForm />
      </div>
    </div>
  );
}
