import { useState } from "react";
import "./AddForm.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { APIUrl } from "../../config/config";
import DataForm from "../DataForm/DataForm";

export default function AddForm() {
  const [newComp, setNewComp] = useState();
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

  const { handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
      const response = await axios.post(`${APIUrl}/companies`, {
        headers: {
          "Content-type": "application/json",
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
  };

  return (
    <>
      <DataForm
        required={true}
        buttonText="Add an Agency"
        onSubmit={handleSubmit(onSubmitHandler)}
      />

      <div>{newComp?.website}</div>
    </>
  );
}
