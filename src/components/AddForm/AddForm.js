import { useState } from "react";
import "./AddForm.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddForm() {
  const [newComp, setNewComp] = useState();
  const schema = yup.object().shape({
    company_name: yup.string().min(2).max(64).required(),
    city_name: yup.string().min(2).max(64).required(),
    company_size: yup.string().min(2).max(64).required(),
    website: yup.string().max(255).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    console.log({ data });
    setNewComp(data);
    reset();
  };

  console.log("newCompany", newComp);
  return (
    <>
      <form className="add-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          placeholder="Agency name"
          type="text"
          {...register("company_name")}
          required
        />
        <input
          placeholder="City name"
          type="text"
          {...register("city_name")}
          required
        />
        <input
          placeholder="Agency size"
          type="text"
          {...register("company_size")}
          required
        />
        <input
          placeholder="website"
          type="text"
          {...register("website")}
          required
        />
        <p>{errors?.message}</p>
        <button type="submit">Add an Agency</button>
      </form>
      <div>{newComp?.website}</div>
    </>
  );
}
