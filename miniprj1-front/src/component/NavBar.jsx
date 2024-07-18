import { Box, Flex, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";

export function NavBar() {
  const navigate = useNavigate();
  const toast = useToast();

  const account = useContext(LoginContext);

  return (
    <Flex gap={5}>
      <Box onClick={() => navigate("/")}>게시판</Box>
      {account.isLoggedIn() && (
        <Box onClick={() => navigate("/board/write")}>글쓰기</Box>
      )}
      {account.isLoggedIn() || (
        <Box onClick={() => navigate("/member/login")}>로그인</Box>
      )}
      {account.isLoggedIn() && (
        <Box
          onClick={() => {
            account.logout();
            toast({
              position: "bottom-right",
              status: "success",
              description: "로그아웃 되었습니다.",
            });
            navigate("/");
          }}
        >
          로그아웃
        </Box>
      )}
      {account.isLoggedIn() || (
        <Box onClick={() => navigate("/member/signup")}>회원가입</Box>
      )}
    </Flex>
  );
}
