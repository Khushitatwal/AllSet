import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Plans from "./pages/Plans";
import Tasks from "./pages/Tasks";
import Schedule from "./pages/Schedule";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
