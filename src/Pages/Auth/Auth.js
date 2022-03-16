import AuthForm from "../../components/AuthForm/AuthForm";
import HeaderSmall from "../../components/HeaderSmall/HeaderSmall";
import "./Auth.css";

export default function Auth() {
  return (
    <div className="generalLogin">
      <HeaderSmall />
      <div className="mainLogin">
        <AuthForm />
      </div>
    </div>
  );
}
