import Logo from "../../components/Logo/Logo";
import Navbar from "../../components/Navbar/Navbar";
import "../Login/Login.css";
import SignupForm from "../../components/SignupForm/SignupForm";

export default function SignUp() {
  return (
    <div className="generalLogin">
      <div className="navLogin">
        <Navbar />
        <Logo />
      </div>
      <div className="mainLogin">
        <SignupForm />
      </div>
    </div>
  );
}
