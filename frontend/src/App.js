import { useEffect, useState } from "react";
import "./App.css";
import { Register } from "./components/Register/Register";
import { Box, TextField } from "@mui/material";

function App() {
  const route = "signup";

  return <Register route={route} />;
}
export default App;
