import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar(props) {
  const navigate = useNavigate();

  useEffect(() => {
    props.setTopBar("Home");
    
    // Check token and update userLogin
    const token = localStorage.getItem('token');
    if (!token) {
      props.setUserLogin("Please login");
    }
  }, [props.setTopBar, props.setUserLogin]);

  const handleLogout = async () => {
    try {
      // Clear token from localStorage
      localStorage.removeItem('token');
      
      // Update UI state
      props.setUserLogin("Please login");
      
      // Call logout API
      await logout();
      
      // Force redirect to login page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect even if there's an error
      props.setUserLogin("Please login");
      window.location.href = '/';
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography variant="h5" color="inherit">
          {props.userLogin !== "Please login" ? (
            <>
              {props.userLogin} | <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              {props.userLogin}
            </>
          )}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Typography variant="h5" color="inherit">
          {props.topBar}
          {props.topBar === "User Photos | Advanced Features" && (
            <>
              <input type="radio" name="advanced" onChange={() => { props.setAdvanced(true) }} />agree
              <input type="radio" name="advanced" onChange={() => { props.setAdvanced(false) }} />degree
            </>
          )}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
