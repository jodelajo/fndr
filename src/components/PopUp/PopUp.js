import { useState, useContext } from "react";
import { AgencyContext } from "../../context/AgencyContext";
import { MdOutlineModeEditOutline, MdOutlineIosShare } from "react-icons/md";
import "./PopUp.css";
import EditForm from "../EditForm/EditForm";
import PopUpContent from "./PopUpContent";

export default function PopUp() {
  const { setPop } = useContext(AgencyContext);
  const [editForm, setEditForm] = useState(false);

  return (
    <div className="modal">
      <div className="icons">
        <span className="pop-icon" onClick={() => setEditForm(!editForm)}>
          <MdOutlineModeEditOutline />
        </span>

        <span className="close-icon" onClick={() => setPop(false)}>
          x
        </span>
        <span className="share">
          <MdOutlineIosShare />
        </span>
      </div>

      <div className="modal_content">
        {!editForm ? (
          <PopUpContent />
        ) : (
          <div>
            <EditForm />
          </div>
        )}
      </div>
    </div>
  );
}
