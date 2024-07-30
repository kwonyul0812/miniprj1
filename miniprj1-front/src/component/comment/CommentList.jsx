import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export function CommentList({ boardId, isProcessing, setIsProcessing }) {
  const [commentList, setCommentList] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!isProcessing) {
      axios
        .get(`/api/comment/${boardId}`)
        .then((res) => setCommentList(res.data));
    }
  }, [isProcessing]);

  const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
  };

  function removeClick() {
    setIsProcessing(true);
    axios.delete();
  }

  return (
    <Stack mb={20}>
      {commentList.map((comment) => (
        <Box key={comment.id} bgColor={"#f2efef"} borderRadius={"5px"}>
          <Flex alignItems={"center"} p={2} gap={2}>
            <FontAwesomeIcon icon={faUser} />
            <Text>{comment.nickName}</Text>
            <Spacer />
            <FontAwesomeIcon icon={faCalendarDays} />
            <Text>{getTimeAgo(comment.inserted)}</Text>
          </Flex>
          <Flex p={2} justifyContent={"space-between"} alignItems={"center"}>
            <Text>{comment.comment}</Text>
            <Flex gap={1}>
              <Button colorScheme={"blue"}>수정</Button>
              <Button colorScheme={"red"} onClick={onOpen}>
                삭제
              </Button>
            </Flex>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>삭제 확인</ModalHeader>
              <ModalBody>삭제 하시겠습니까?</ModalBody>
              <ModalFooter gap={1}>
                <Button onClick={onClose}>취소</Button>
                <Button
                  colorScheme={"red"}
                  onClick={() => removeClick(comment.id)}
                >
                  삭제
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      ))}
    </Stack>
  );
}
