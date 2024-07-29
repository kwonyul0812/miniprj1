import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { LoginContext } from "../LoginProvider.jsx";
import axios from "axios";

export function CommentWrite({ boardId }) {
  const [comment, setComment] = useState("");

  const account = useContext(LoginContext);
  const { onOpen, isOpen, onClose } = useDisclosure();

  function submitClick() {
    axios.post("/api/comment/write", {
      comment,
      boardId,
    });
  }

  return (
    <Flex gap={1}>
      <Box flex={1}>
        <Textarea
          placeholder={
            account.isLoggedIn() ? "댓글을 작성해보세요" : "로그인을 해주세요"
          }
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          colorScheme={"blue"}
          h={"100%"}
          onClick={account.isLoggedIn() ? submitClick : onOpen}
        >
          작성
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent w={"300px"}>
          <ModalHeader>알림</ModalHeader>
          <ModalBody textAlign={"center"}>로그인을 해주세요</ModalBody>
          <ModalFooter>
            <Button colorScheme={"blue"} onClick={onClose}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
