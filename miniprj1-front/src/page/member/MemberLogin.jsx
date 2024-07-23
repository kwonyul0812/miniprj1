import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { useNavigate } from "react-router-dom";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const toast = useToast();
  const account = useContext(LoginContext);

  function LoginClick() {
    axios
      .post("/api/member/token", { email, password })
      .then((res) => {
        account.login(res.data.token);

        toast({
          position: "bottom-right",
          status: "success",
          description: "로그인 성공",
        });
        navigate("/");
      })
      .catch((err) => {
        localStorage.removeItem("token");
        toast({
          position: "bottom-right",
          status: "error",
          description: "로그인 실패",
        });
      });
  }

  return (
    <Center>
      <Box w={400}>
        <Box mb={10}>
          <Heading>로그인</Heading>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input type={"email"} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>비밀번호</FormLabel>
            <Input
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box ml={"320px"}>
          <Button colorScheme={"blue"} onClick={LoginClick}>
            로그인
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
