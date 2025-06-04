import './App.css';

import React from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import { useState } from 'react';
import LoginRegister from './components/LoginRegister';
import Register from './components/Register'

const App = (props) => {
  const [topBar, setTopBar] = useState("");
  const [advanced, setAdvanced] = useState(false)
  const [userLogin, setUserLogin] = useState("Please login");

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              topBar={topBar}
              setTopBar={setTopBar}
              advanced={advanced}
              setAdvanced={setAdvanced}
              userLogin={userLogin}
              setUserLogin={setUserLogin}
            />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/" element={<LoginRegister setUserLogin={setUserLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/users/:userId"
                  element={<UserDetail setTopBar={setTopBar} />}
                />
                <Route
                  path="/photos/:userId"
                  element={
                    <UserPhotos
                      setTopBar={setTopBar}
                      advanced={advanced}
                    />
                  }
                />
                <Route path="/users" element={<UserList />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
