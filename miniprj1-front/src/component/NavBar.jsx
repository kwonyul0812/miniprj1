import { Box, Flex, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "./LoginProvider.jsx";

export function NavBar() {
  const navigate = useNavigate();
  const toast = useToast();

  const account = useContext(LoginContext);

  return (
    <Flex
      w={"100%"}
      h={"50px"}
      bgColor={"lightgray"}
      alignItems={"center"}
      justifyContent={"space-between"}
      fontSize={20}
      fontWeight={600}
      mb={10}
    >
      <Flex p={20} gap={5}>
        <Box cursor={"pointer"} onClick={() => navigate("/")}>
          게시판
        </Box>
        {account.isLoggedIn() && (
          <Box cursor={"pointer"} onClick={() => navigate("/board/write")}>
            글쓰기
          </Box>
        )}
      </Flex>
      <Flex p={20} gap={5}>
        {account.isLoggedIn() && (
          <Box cursor={"pointer"} onClick={() => navigate("/member/view")}>
            {account.nickName} 님
          </Box>
        )}
        {account.isLoggedIn() || (
          <Box cursor={"pointer"} onClick={() => navigate("/member/login")}>
            로그인
          </Box>
        )}
        {account.isLoggedIn() && (
          <Box
            cursor={"pointer"}
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
          <Box cursor={"pointer"} onClick={() => navigate("/member/signup")}>
            회원가입
          </Box>
        )}
      </Flex>
    </Flex>
  );
}
