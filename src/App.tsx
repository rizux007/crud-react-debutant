import React, { useEffect, useState } from "react";
import "./App.css";
import AddUser from "./components/AddUser";
import UserItem from "./components/User";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

interface User {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onAdd = async (name: string, email: string) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (res.status === 201) {
        const data = await res.json();
        setUsers((users) => [...users, data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (id: number) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEdit = async (id: number, name: string, email: string) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({ id, name, email }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (res.ok) {
        const updatedUser = { id, name, email };
        setUsers((prevUsers) => {
          const updatedUsers = prevUsers.map((user) =>
            user.id === id ? updatedUser : user
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          return updatedUsers;
        });
      } else {
        console.error("Mise à jour échouée", res.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = () => {
    setUsers([]);
  };

  const handleRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h3>CRUD APPLICATION</h3>
      <input
        type="search"
        placeholder="Rechercher un utilisateur"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <AddUser onAdd={onAdd} />
      <button
        title={showUsers ? "Cacher Utilisateur" : "Afficher Utilisateur"}
        className="buttonToggle"
        onClick={() => setShowUsers(!showUsers)}
      >
        {showUsers ? <FaToggleOn /> : <FaToggleOff />}
      </button>
      {showUsers && (
        <div className="listItem">
          {filteredUsers.map((user, index) => (
            <UserItem
              id={user.id}
              key={index}
              name={user.name}
              email={user.email}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
      {filteredUsers.length > 0 ? (
        <div className="buttonAction">
          <button className="clear" onClick={handleClear}>
            Supprimer tout
          </button>
        </div>
      ) : (
        <div className="buttonAction">
          <h3>Aucune donnée à afficher</h3>
          <button onClick={handleRefresh}>Rafraîchir la page</button>
        </div>
      )}
    </div>
  );
};

export default App;
