import React, { useState } from "react";

interface AddUserProps {
  onAdd: (name: string, email: string) => void;
}

const AddUser: React.FC<AddUserProps> = ({ onAdd }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(name, email);
    setName("");
    setEmail("");
  };

  return (
    <div className="App">
      <form onSubmit={handleOnSubmit}>
        <h3>Ajouter un utilisateur</h3>
        <input
          placeholder="Nom"
          name="name"
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Ajouter</button>
        <hr />
      </form>
    </div>
  );
};

export default AddUser;
