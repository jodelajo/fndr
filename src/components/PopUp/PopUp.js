import { useState, useContext } from "react";
import { AgencyContext } from "../../context/AgencyContext";
import { AuthContext } from "../../context/AuthContext";
import {
  MdOutlineModeEditOutline,
  MdOutlineIosShare,
  MdDeleteOutline,
  MdAdd,
  MdClose,
} from "react-icons/md";
import "./PopUp.css";
import EditForm from "../EditForm/EditForm";
import PopUpContent from "./PopUpContent";

export default function PopUp() {
  const { setPop } = useContext(AgencyContext);
  const [editForm, setEditForm] = useState(false);
  const { userToken } = useContext(AuthContext);

  return (
    <div className="modal">
      <div className="icons">
        {userToken && (
          <span className="pop-icon" onClick={() => setEditForm(!editForm)}>
            <MdOutlineModeEditOutline />
          </span>
        )}

        <span className="pop-close" onClick={() => setPop(false)}>
          <MdClose />
        </span>
        <span className="pop-share">
          <MdOutlineIosShare />
        </span>
        {userToken && (
          <span className="delete">
            <MdDeleteOutline />
          </span>
        )}
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
