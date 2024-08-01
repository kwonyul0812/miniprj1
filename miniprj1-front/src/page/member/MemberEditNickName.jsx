import { useContext, useState } from "react";
import { LoginContext } from "../../component/LoginProvider.jsx";
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
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export function MemberEditNickName() {
  const [nickName, setNickName] = useState("");
  const [isNickNameChecked, setIsNickNameChecked] = useState(false);

  const account = useContext(LoginContext);
  const navigate = useNavigate();
  const toast = useToast();

  let isDisabled = false;
  if (nickName.trim().length === 0) {
    isDisabled = true;
  }

  if (!isNickNameChecked) {
    isDisabled = true;
  }

  function editNickName() {
    axios
      .put("/api/member/edit/nickName", {
        nickName: nickName,
      })
      .then((res) => {
        account.login(res.data.token);
        toast({
          position: "bottom-right",
          status: "success",
          description: "닉네임 변경 완료",
        });
        navigate("/member/view");
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

  return (
    <Center>
      <Box w={600}>
        <Box mb={10}>
          <Heading>닉네임 수정</Heading>
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
        <Flex mb={7} ml={"465px"}>
          <Button mr={1} onClick={() => navigate("/member/view")}>
            취소
          </Button>
          <Button
            isDisabled={isDisabled}
            colorScheme={"blue"}
            onClick={editNickName}
          >
            수정
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}
