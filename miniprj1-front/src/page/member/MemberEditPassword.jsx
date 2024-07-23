import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export function MemberEditPassword() {
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  let isDisabled = false;
  if (password.trim().length === 0) {
    isDisabled = true;
  }
  if (passwordCheck.trim().length === 0) {
    isDisabled = true;
  }
  if (password !== passwordCheck) {
    isDisabled = true;
  }

  function editPassword() {
    axios
      .post("/api/member/edit/password", {
        password: password,
      })
      .then((res) => {
        toast({
          position: "bottom-right",
          status: "success",
          description: "비밀번호 변경 완료",
        });
        navigate("/member/view");
      });
  }

  return (
    <Center>
      <Box w={600}>
        <Box mb={10}>
          <Heading>비밀번호 수정</Heading>
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
        <Box mb={7}>
          <FormControl>
            <FormLabel>비밀번호 확인</FormLabel>
            <Input
              type={"password"}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </FormControl>
        </Box>
        <Flex mb={7} ml={"465px"}>
          <Button mr={1} onClick={() => navigate("/member/view")}>
            취소
          </Button>
          <Button
            isDisabled={isDisabled}
            colorScheme={"blue"}
            onClick={editPassword}
          >
            수정
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}
