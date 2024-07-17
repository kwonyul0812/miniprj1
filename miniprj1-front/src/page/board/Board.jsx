import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function Board() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
