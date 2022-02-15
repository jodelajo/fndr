import { useSearchParams } from "react-router-dom";

export default function useCustomSearchParams() {
  const [search, setSearch] = useSearchParams();
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));

  return [searchAsObject, setSearch];
}
