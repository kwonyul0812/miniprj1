import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");

  function createAccount() {
    axios
      .post(`/api/member/signup`, { email, password, nickName })
      .then()
      .catch()
      .finally();
  }

  return (
    <Center>
      <Box w={400}>
        <Box mb={10}>
          <Heading>회원 가입</Heading>
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
              type={"passowrd"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input onChange={(e) => setNickName(e.target.value)} />
          </FormControl>
        </Box>
        <Box>
          <Button onClick={createAccount} colorScheme={"blue"}>
            확인
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
