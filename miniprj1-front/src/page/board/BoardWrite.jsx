import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { LoginContext } from "../../component/LoginProvider.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);

  const navigate = useNavigate();
  const toast = useToast();
  const account = useContext(LoginContext);

  function handleWriteClick() {
    axios.postForm("/api/board/write", { title, content, files }).then(() => {
      toast({
        position: "bottom-right",
        status: "success",
        description: "게시글 등록 완료",
      });
      navigate("/");
    });
  }

  return (
    <Center>
      <Box w={600}>
        <Box mb={10}>
          <Heading>글쓰기</Heading>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>이미지</FormLabel>
            <Input
              type={"file"}
              multiple
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
            />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>내용</FormLabel>
            <Textarea
              resize={"none"}
              height={"300px"}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input readOnly value={account.nickName} />
          </FormControl>
        </Box>
        <Box mb={7} ml={"530px"}>
          <Button onClick={handleWriteClick} colorScheme={"blue"}>
            작성
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
