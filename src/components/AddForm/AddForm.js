import { useState, useContext } from "react";
import "./AddForm.css";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { APIUrl } from "../../config/config";
import { AuthContext } from "../../context/AuthContext";

export default function AddForm() {
  const [newComp, setNewComp] = useState();
  //   const { userToken } = useContext(AuthContext);
  const schema = yup.object().shape({
    company_name: yup
      .string()
      .min(2)
      .max(64)
      .required("Companyname is required"),
    city_name: yup.string().min(2).max(64).required(),
    company_size: yup.string().min(2).max(64).required(),
    website: yup.string().url().max(255).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // console.log(useForm().register);
  // console.log("hoi", localStorage.token);

  const onSubmitHandler = async (data) => {
    try {
      const response = await axios.post(`${APIUrl}/companies`, {
        headers: {
          //   "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        data,
      });

      const content = response.data;
      console.log("content", content);
      setNewComp(content);
    } catch (error) {
      console.error(error);
    }

    // console.log("data", data);
    // setNewComp(data);
    // reset();
  };

  // console.log("newCompany", newComp);
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
          type="url"
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
