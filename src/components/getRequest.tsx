import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/getRequest.scss";
import Card from "./card";
import Button from "./button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface User {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  photo: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  useEffect(() => {
    axios
      .get("https://frontend-test-assignment-api.abz.agency/api/v1/users")
      .then((response) => {
        setUsers(response.data.users);
        setLoading(false);
        console.log(users);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="users-list">
      <h2 className="users-list__title">Working with GET request</h2>
      {loading ? (
        <Box className="loading" sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="users-list__grid">
          {users.slice(0, visibleCount).map((user) => (
            <Card
              key={user.id}
              name={user.name}
              position={user.position}
              email={user.email}
              phone={user.phone}
              photo={user.photo}
            />
          ))}
        </div>
      )}

      {visibleCount < users.length && (
        <div onClick={handleShowMore}>
          <Button text={"Show more"}></Button>
        </div>
      )}
    </div>
  );
};

export default UsersList;
