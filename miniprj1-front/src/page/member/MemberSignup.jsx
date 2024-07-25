import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [isNickNameChecked, setIsNickNameChecked] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  function createAccount() {
    axios
      .post(`/api/member/signup`, { email, password, nickName })
      .then(() => navigate("/"))
      .catch((err) => {
        toast({
          position: "bottom-right",
          status: "warning",
          description: "정보를 다시 확인해주세요",
        });
      });
  }

  function checkNickName() {
    axios
      .get(`/api/member/check?nickName=${nickName}`)
      .then((res) => {
        toast({
          position: "bottom-right",
          status: "warning",
          description: "사용 불가능한 닉네임 입니다",
        });
        setIsNickNameChecked(false);
      })
      .catch((err) => {
        toast({
          position: "bottom-right",
          status: "info",
          description: "사용 가능한 닉네임 입니다",
        });
        setIsNickNameChecked(true);
      });
  }

  let isDisabled = false;
  if (email.trim().length === 0) {
    isDisabled = true;
  }
  if (password.trim().length === 0) {
    isDisabled = true;
  }
  if (passwordCheck.trim().length === 0) {
    isDisabled = true;
  }
  if (nickName.trim().length === 0) {
    isDisabled = true;
  }
  if (password !== passwordCheck) {
    isDisabled = true;
  }
  if (!isNickNameChecked) {
    isDisabled = true;
  }

  return (
    <Center>
      <Box w={600}>
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
        <Box mb={7}>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <InputGroup size={"md"}>
              <Input
                onChange={(e) => {
                  setNickName(e.target.value);
                  setIsNickNameChecked(false);
                }}
              />
              <InputRightElement width={"5.5rem"}>
                <Button onClick={checkNickName}>중복확인</Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Flex ml={"465px"}>
          <Button mr={1} onClick={() => navigate("/")}>
            취소
          </Button>
          <Button
            isDisabled={isDisabled}
            onClick={createAccount}
            colorScheme={"blue"}
          >
            가입
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}
