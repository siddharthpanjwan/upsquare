import React, { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("http://localhost:5000/api/userdetails", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((userDetails) => {
          console.log(userDetails.data);
          setUser(userDetails.data);
        });
    }
  }, []);
  return (
    <div className="home">
      <p>First name : {user.firstName}</p>
      <p>Last name : {user.lastName}</p>
    </div>
  );
}

export default Home;
