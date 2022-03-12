import { ThreeDots } from "react-loader-spinner";
import "./SubmitButton.css";

export default function SubmitButton({ isLoading, text }) {
  return (
    <button type="submit" disabled={isLoading} className="submit-button">
      {isLoading ? (
        <ThreeDots width="40" height="40" color="grey" />
      ) : (
        `${text}`
      )}
    </button>
  );
}
