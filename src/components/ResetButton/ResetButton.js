export default function ResetButton({ resetInputField }) {
  return (
    <button onClick={resetInputField} className="resetButton" type="button">
      Clear
    </button>
  );
}
