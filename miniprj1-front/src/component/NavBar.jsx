import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <Flex gap={5}>
      <Box>게시판</Box>
      <Box onClick={() => navigate("/member/login")}>로그인</Box>
      <Box onClick={() => navigate("/member/signup")}>회원가입</Box>
    </Flex>
  );
}
