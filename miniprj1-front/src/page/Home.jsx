import { Box } from "@chakra-ui/react";
import { NavBar } from "../component/NavBar.jsx";
import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
}
