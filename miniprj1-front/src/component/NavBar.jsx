import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";

export function NavBar() {
  const navigate = useNavigate();

  const account = useContext(LoginContext);

  return (
    <Flex gap={5}>
      <Box>게시판</Box>
      {account.isLoggedIn() || (
        <Box onClick={() => navigate("/member/login")}>로그인</Box>
      )}
      {account.isLoggedIn() && (
        <Box onClick={() => account.logout()}>로그아웃</Box>
      )}
      {account.isLoggedIn() || (
        <Box onClick={() => navigate("/member/signup")}>회원가입</Box>
      )}
    </Flex>
  );
}
