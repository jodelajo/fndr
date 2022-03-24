import { ThreeDots } from "react-loader-spinner";
import "./SubmitButton.css";

export default function SubmitButton({ isLoading, text, color }) {
  return (
    <button type="submit" disabled={isLoading} className="submit-button">
      {isLoading ? (
        <ThreeDots width="40" height="40" color={color} />
      ) : (
        `${text}`
      )}
    </button>
  );
}
