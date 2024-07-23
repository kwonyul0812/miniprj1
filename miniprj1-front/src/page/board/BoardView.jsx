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
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState({});

  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data));
  }, []);

  function removeClick() {
    axios
      .delete(`/api/board/${id}`)
      .then((res) => {
        toast({
          position: "bottom-right",
          status: "success",
          description: "게시글 삭제 성공",
        });
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 403) {
          toast({
            position: "bottom-right",
            status: "warning",
            description: "접근 권한 없음",
          });
        }
      });
  }

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
          <Flex alignItems={"center"} ml={3}>
            <FontAwesomeIcon icon={faUser} />
            <Box ml={1}>{board.nickName}</Box>
          </Flex>
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
        {account.hasAccess(board.memberId) && (
          <Flex mb={7} ml={"465px"}>
            <Button
              mr={1}
              colorScheme={"blue"}
              onClick={() => navigate(`/board/edit/${board.id}`)}
            >
              수정
            </Button>
            <Button colorScheme={"red"} onClick={onOpen}>
              삭제
            </Button>
          </Flex>
        )}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalBody>삭제 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button mr={1} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme={"red"} onClick={removeClick}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
