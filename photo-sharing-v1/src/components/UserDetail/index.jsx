import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams, Link } from "react-router-dom";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail(props) {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    props.setTopBar("User Detail");
  }, [props.setTopBar]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:8081/api/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div>
      {!user ? (
        <Typography variant="body1">Loading ...</Typography>
      ) : (
        <div>
          <Typography variant="body1">first_name: {user.first_name}</Typography>
          <Typography variant="body1">last_name: {user.last_name}</Typography>
          <Typography variant="body1">location: {user.location}</Typography>
          <Typography variant="body1">description: {user.description}</Typography>
          <Typography variant="body1">occupation: {user.occupation}</Typography>
          <Link to={`/photos/${userId}`}>
            <Typography variant="body1">Photos</Typography>
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
