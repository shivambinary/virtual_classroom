import { useEffect, useState } from "react";

const Dashboard = () => {

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);
  // const fetchClasses = async () => {
  //   const res = await API.get("/classes");
  //   setClasses(res.data.data);
  // };
  const fetchClasses = () => {

    const fakeClasses = [
      { _id: "1", name: "Math Class" },
      { _id: "2", name: "Science Class" },
      { _id: "3", name: "Programming Class" }
    ];

    setClasses(fakeClasses);
  };

  const joinClass = (id) => {
    alert("Joined class " + id);
  };

  return (
    <div className="dashboard">

      <h2>Classes</h2>

      {classes.map((c) => (
        <div className="class-card" key={c._id}>
          <h3>{c.name}</h3>

          <button onClick={() => joinClass(c._id)}>
            Join
          </button>
        </div>
      ))}

    </div>
  );
};

export default Dashboard;