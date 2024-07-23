import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../component/LoginProvider.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberView() {
  const [member, setMember] = useState({});

  const navigate = useNavigate();
  const account = useContext(LoginContext);

  useEffect(() => {
    axios.get(`/api/member/${account.id}`).then((res) => setMember(res.data));
  }, []);

  return (
    <Center>
      <Box w={600}>
        <Box mb={10}>
          <Heading>회원 정보</Heading>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input value={member.email} type={"email"} readOnly />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>닉네임</FormLabel>
            <Input value={member.nickName} readOnly />
          </FormControl>
        </Box>
        <Flex mb={7} ml={"345px"}>
          <Button
            mr={1}
            colorScheme={"blue"}
            onClick={() => navigate("/member/edit/nickName")}
          >
            닉네임 변경
          </Button>
          <Button
            colorScheme={"blue"}
            onClick={() => navigate("/member/edit/password")}
          >
            비밀번호 변경
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}
