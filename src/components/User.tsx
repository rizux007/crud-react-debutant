import React, { useState } from "react";
import "./user.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

interface UserItemProps {
  id: number;
  name: string;
  email: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, email: string) => void;
}

const UserItem: React.FC<UserItemProps> = ({
  id,
  name,
  email,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(id, editedName, editedEmail);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(name);
    setEditedEmail(email);
  };

  return (
    <div className="data">
      <div className="list">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <button onClick={handleSave}>
              <FaEdit />
            </button>
            <button onClick={handleCancel}>
              <MdOutlineCancel />
            </button>
          </>
        ) : (
          <>
            <span>{name}</span>
            <span>{email}</span>
            <span>
              <button onClick={handleEdit}>
                <FaEdit />
              </button>
              <button onClick={handleDelete}>
                <FaRegTrashAlt />
              </button>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default UserItem;
