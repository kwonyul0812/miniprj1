import { useParams } from "react-router-dom";
import {
  Box,
  Center,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState({});

  const ChakraTextareaAutosize = chakra(TextareaAutosize);

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data));
  }, []);

  return (
    <Center>
      <Box w={600}>
        <Box mb={10}>
          <Heading>{id}번 게시물</Heading>
        </Box>
        <Box mb={3}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input value={board.title} readOnly />
          </FormControl>
        </Box>
        <Flex mb={7}>
          <Box ml={3}>{board.nickName}</Box>
          <Spacer />
          <Box>{board.inserted}</Box>
        </Flex>
        <Box mb={7}>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid",
              borderColor: "lightgray",
              borderRadius: "5px",
              resize: "none", // 사용자 크기 조정 비활성화
              overflow: "hidden", // 내용이 넘칠 경우 스크롤바 숨김
              outlineColor: "#3182CE",
            }}
            value={board.content}
            readOnly
          />
        </Box>
      </Box>
    </Center>
  );
}
