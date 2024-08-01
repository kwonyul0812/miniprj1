import { useContext, useEffect, useState } from "react";
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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { LoginContext } from "../LoginProvider.jsx";

export function CommentList({ boardId, isProcessing, setIsProcessing }) {
  const [commentList, setCommentList] = useState([]);
  const [commentId, setCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const account = useContext(LoginContext);
  const toast = useToast();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

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

  function removeClick(commentId) {
    setCommentId(commentId);
    onOpen1();
  }

  function deleteComment() {
    setIsProcessing(true);
    axios
      .delete(`/api/comment/delete`, {
        data: {
          id: commentId,
        },
      })
      .then((res) => {
        toast({
          position: "bottom-right",
          status: "success",
          description: "댓글 삭제 되었습니다",
        });
      })
      .finally(() => {
        setIsProcessing(false);
        setCommentId(null);
        onClose1();
      });
  }

  function checkProcess(id) {
    if (isEditing === true && id === commentId) {
      return true;
    }
    return false;
  }

  function modifyComment() {
    setIsProcessing(true);
    axios
      .put("/api/comment/modify", {
        id: commentId,
        comment: commentText,
      })
      .then((res) => {
        onClose2();
        setIsEditing(false);
      })
      .finally(() => setIsProcessing(false));
  }

  function modifyClick(id) {
    setCommentId(id);
    onOpen2();
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
          {checkProcess(comment.id) || (
            <Flex p={2} justifyContent={"space-between"} alignItems={"center"}>
              <Text>{comment.comment}</Text>
              {account.hasAccess(comment.memberId) && (
                <Flex gap={1}>
                  <Button
                    colorScheme={"blue"}
                    onClick={() => {
                      setIsEditing(true);
                      setCommentId(comment.id);
                      setCommentText(comment.comment);
                    }}
                  >
                    수정
                  </Button>
                  <Button
                    colorScheme={"red"}
                    onClick={() => removeClick(comment.id)}
                  >
                    삭제
                  </Button>
                </Flex>
              )}
            </Flex>
          )}
          {checkProcess(comment.id) && (
            <Flex p={2} justifyContent={"space-between"} alignItems={"center"}>
              <Textarea
                resize={"none"}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Flex gap={1}>
                <Button onClick={() => setIsEditing(false)}>취소</Button>
                <Button
                  colorScheme={"blue"}
                  onClick={() => modifyClick(comment.id)}
                >
                  수정
                </Button>
              </Flex>
            </Flex>
          )}
        </Box>
      ))}
      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalBody>삭제 하시겠습니까?</ModalBody>
          <ModalFooter gap={1}>
            <Button onClick={onClose1}>취소</Button>
            <Button colorScheme={"red"} onClick={deleteComment}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>수정 확인</ModalHeader>
          <ModalBody>수정 하시겠습니까?</ModalBody>
          <ModalFooter gap={1}>
            <Button onClick={onClose2}>취소</Button>
            <Button colorScheme={"blue"} onClick={modifyComment}>
              수정
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
