import { useState } from "react";
import API from "../services/api";

const CreateClass = () => {

  const [name, setName] = useState("");

  const createClass = async () => {
    await API.post("/classes", { name });
    alert("Class created");
  };

  return (
    <div>

      <h2>Create Class</h2>

      <input
        placeholder="Class Name"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createClass}>
        Create
      </button>

    </div>
  );
};

export default CreateClass;