import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
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
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import { LoginContext } from "../../component/LoginProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { CommentComponent } from "../../component/comment/CommentComponent.jsx";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons/faStar";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState({});
  const [like, setLike] = useState({});

  const {
    onOpen: onOpen1,
    onClose: onClose1,
    isOpen: isOpen1,
  } = useDisclosure();
  const {
    onOpen: onOpen2,
    onClose: onClose2,
    isOpen: isOpen2,
  } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const account = useContext(LoginContext);

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => {
      setBoard(res.data.board);
      setLike(res.data.like);
    });
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

  function likeClick() {
    axios
      .put(`/api/board/like`, {
        id: id,
      })
      .then((res) => setLike(res.data));
  }

  console.log(account.isLoggedIn);

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
        <Flex mb={7} flexWrap="wrap" justifyContent={"center"}>
          {board.fileList &&
            board.fileList.map((file) => (
              <Image key={file.name} repeat w={"30%"} m={"1%"} src={file.src} />
            ))}
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
        <Box mb={7}>
          <Center>
            <Stack>
              {like.like && (
                <Button
                  borderRadius={"100%"}
                  w={"50px"}
                  h={"50px"}
                  bgColor={"#3B4890"}
                  onClick={account.isLoggedIn() ? likeClick : onOpen2}
                  justifyContent={"center"}
                >
                  <FontAwesomeIcon
                    fontSize={"25px"}
                    color={"#FFCC00"}
                    icon={faStarSolid}
                  />
                </Button>
              )}
              {like.like || (
                <Button
                  borderRadius={"100%"}
                  w={"50px"}
                  h={"50px"}
                  bgColor={"#AAAAAA"}
                  onClick={account.isLoggedIn() ? likeClick : onOpen2}
                  justifyContent={"center"}
                >
                  <FontAwesomeIcon
                    icon={faStarSolid}
                    fontSize={"25px"}
                    color={"#FFFFFF"}
                  />
                </Button>
              )}
              <Text mt={-2} textAlign={"center"}>
                추천 {like.count}
              </Text>
            </Stack>
          </Center>
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
            <Button colorScheme={"red"} onClick={onOpen1}>
              삭제
            </Button>
          </Flex>
        )}
        <CommentComponent boardId={id} />
      </Box>
      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalBody>삭제 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button mr={1} onClick={onClose1}>
              취소
            </Button>
            <Button colorScheme={"red"} onClick={removeClick}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen2} onClose={onClose2} isCentered>
        <ModalContent w={"400px"}>
          <ModalHeader>알림</ModalHeader>
          <ModalBody textAlign={"center"}>
            추천은 로그인시 이용 가능합니다
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"blue"} onClick={onClose2}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
