import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState({});
  const [files, setFiles] = useState(null);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data));
  }, []);

  function handleModifyClick() {
    axios
      .postForm("/api/board/edit", {
        id: board.id,
        title: board.title,
        content: board.content,
        files,
      })
      .then((res) => navigate(`/board/view/${id}`));
  }

  return (
    <Center>
      <Box w={600}>
        <Box mb={10}>
          <Heading>글수정</Heading>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              value={board.title}
              onChange={(e) => setBoard({ ...board, title: e.target.value })}
            />
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
              value={board.content}
              onChange={(e) => setBoard({ ...board, content: e.target.value })}
            />
          </FormControl>
        </Box>
        <Box mb={7}>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input readOnly value={account.nickName} />
          </FormControl>
        </Box>
        <Flex mb={7} ml={"465px"}>
          <Button mr={1} onClick={() => navigate(`/board/view/${id}`)}>
            취소
          </Button>
          <Button onClick={onOpen} colorScheme={"blue"}>
            수정
          </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>수정 확인</ModalHeader>
          <ModalBody>수정 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button mr={1} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme={"blue"} onClick={handleModifyClick}>
              수정
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
