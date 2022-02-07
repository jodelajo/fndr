export default function SizeFilter({ companySizes, setCompanySizes }) {
  const handleChange = (e) => {
    setCompanySizes(e.target.value);
  };

  //   console.log("companysizes", companySizes);
  return (
    <div>
      <label>
        <select value={companySizes} defaultValue="" onChange={handleChange}>
          <option value="">Selecteer company size</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-100">51-100</option>
          <option value="GT-100"> &gt; 100</option>
        </select>
      </label>
    </div>
  );
}
