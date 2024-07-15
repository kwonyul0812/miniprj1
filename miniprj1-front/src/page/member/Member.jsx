import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function Member() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
