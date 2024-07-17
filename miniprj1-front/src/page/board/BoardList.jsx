import {
  Box,
  Center,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/board/list")
      .then((res) => setBoardList(res.data))
      .catch()
      .finally();
  }, []);

  return (
    <Center>
      <Box w={800}>
        <Box mb={10}>
          <Heading>게시판</Heading>
        </Box>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>제목</Th>
                <Th>작성자</Th>
                <Th>작성시간</Th>
              </Tr>
            </Thead>
            <Tbody>
              {boardList.map((board) => (
                <Tr
                  key={board.id}
                  cursor={"pointer"}
                  _hover={{ bgColor: "#dbdde0" }}
                  onClick={() => navigate(`/board/view/${board.id}`)}
                >
                  <Td>{board.id}</Td>
                  <Td>{board.title}</Td>
                  <Td>{board.nickName}</Td>
                  <Td>{board.inserted}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Center>
  );
}
