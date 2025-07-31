import { useState } from "react";
import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import "./App.css";
function App() {
  return (
    <>
      <Container>
        <Header />
      </Container>
    </>
  );
}

export default App;
