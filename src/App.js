import { useEffect, useState } from "react";
import "./App.css";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase-config";

function App() {
  const [users, setUsers] = useState([]);

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const usersCollectionRef = collection(db, "users");

  // CREATE USER
  const createUser = async () => {
    try {
      await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    } catch (err) {
      console.log(err.message);
    }
  };

  // UPDATE USER
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };

    await updateDoc(userDoc, newFields);
  };

  // DELETE USER
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);

    await deleteDoc(userDoc);
  };

  // GET DATA
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);

      // console.log(data.docs[0]._document.data.value.mapValue.fields.name);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="main_div">
      <div className="inputs" style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="name.."
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="age.."
          onChange={(e) => setNewAge(e.target.value)}
        />
        <button onClick={createUser} style={{ cursor: "pointer" }}>
          Create User
        </button>
      </div>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <strong>ID: {user.id}</strong>
            <h1>NAME: {user.name}</h1>
            <h1>AGE: {user.age}</h1>
            <button
              style={{ marginBottom: ".5rem" }}
              onClick={() => updateUser(user.id, user.age)}
            >
              Increase Age +1
            </button>

            <button onClick={() => deleteUser(user.id)}>Delete User</button>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
