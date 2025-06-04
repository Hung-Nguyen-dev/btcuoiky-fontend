import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import { Link } from "react-router-dom";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUsers([]);
        return;
      }

      const res = await fetch("http://localhost:8081/api/user/list", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('token');
          setUsers([]);
          return;
        }
        throw new Error('Failed to fetch users');
      }

      const result = await res.json();
      setUsers(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
      setUsers([]);
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Set up an interval to check for token changes
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        fetchUsers();
      } else {
        setUsers([]);
      }
    };

    // Check immediately
    checkToken();

    // Set up interval to check every second
    const interval = setInterval(checkToken, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      {/* <Typography variant="body1">
        This is the user list, which takes up 3/12 of the window. You might
        choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
        and <a href="https://mui.com/components/dividers/">Dividers</a> to
        display your users like so:
      </Typography> */}
      <List component="nav">
        {users.length > 0 ? (
          users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem component={Link} to={`/users/${item._id}`}>
                <ListItemText primary={item.first_name} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography>No users available</Typography>
        )}
      </List>
      {/* <Typography variant="body1">
        The model comes in from models.userListModel()
      </Typography> */}
    </div>
  );
}

export default UserList;
