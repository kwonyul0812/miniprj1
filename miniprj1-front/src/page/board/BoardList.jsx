import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko });
  };

  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });

    setSearchType("all");
    setSearchKeyword("");

    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");

    if (typeParam != null) {
      setSearchType(typeParam);
    }
    if (keywordParam != null) {
      setSearchKeyword(keywordParam);
    }
  }, [searchParams]);

  const pageNumber = [];
  for (let i = pageInfo.beginPageNumber; i <= pageInfo.endPageNumber; i++) {
    pageNumber.push(i);
  }

  function pageClick(number) {
    searchParams.set("page", number);
    navigate(`/?${searchParams}`);
  }

  function searchBoardClick() {
    navigate(`/?type=${searchType}&keyword=${searchKeyword}`);
  }

  return (
    <Center>
      <Box w={1000}>
        <Box mb={10}>
          <Heading>게시판</Heading>
        </Box>
        <Box mb={10}>
          <Table>
            <Thead>
              <Tr>
                <Th textAlign={"center"} w={"5%"}>
                  No.
                </Th>
                <Th textAlign={"center"} w={"52%"}>
                  제목
                </Th>
                <Th textAlign={"center"} w={"9%"}>
                  추천수
                </Th>
                <Th textAlign={"center"} w={"20%"}>
                  작성자
                </Th>
                <Th textAlign={"center"} w={"14%"}>
                  작성시간
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {boardList.map((board) => (
                <Tr
                  key={board.id}
                  cursor={"pointer"}
                  _hover={{ bgColor: "#dbdde0" }}
                  onClick={() => navigate(`/board/view/${board.id}`)}
                  textAlign={"center"}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Td textAlign={"center"}>{board.id}</Td>
                  <Td display={"flex"} alignItems={"center"} gap={2}>
                    {board.title}
                    {board.numberOfImages > 0 && (
                      <FontAwesomeIcon fontSize={"14px"} icon={faImage} />
                    )}
                    {board.numberOfComments > 0 && (
                      <Text>[{board.numberOfComments}]</Text>
                    )}
                  </Td>
                  <Td textAlign={"center"}>{board.numberOfLikes}</Td>
                  <Td>{board.nickName}</Td>
                  <Td textAlign={"center"}>{getTimeAgo(board.inserted)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Flex justifyContent={"center"} mb={5}>
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            w={"100px"}
            mr={1}
          >
            <option value="all">전체</option>
            <option value="title">제목</option>
            <option value="nickName">작성자</option>
          </Select>
          <Input
            mr={1}
            w={"200px"}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Button onClick={searchBoardClick}>검색</Button>
        </Flex>
        <Flex justifyContent={"center"} gap={1} mb={10}>
          {pageInfo.currentPageNumber > 1 && (
            <Button w={"40px"} onClick={() => pageClick(1)}>
              <FontAwesomeIcon icon={faAnglesLeft} />
            </Button>
          )}
          {pageInfo.prevPageNumber > 0 && (
            <Button
              w={"40px"}
              onClick={() => pageClick(pageInfo.prevPageNumber)}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
          )}
          {pageNumber.map((number) => (
            <Button
              key={number}
              colorScheme={
                pageInfo.currentPageNumber === number ? "blue" : "gray"
              }
              w={"40px"}
              onClick={() => pageClick(number)}
            >
              {number}
            </Button>
          ))}
          {pageInfo.nextPageNumber <= pageInfo.lastPageNumber && (
            <Button
              w={"40px"}
              onClick={() => pageClick(pageInfo.nextPageNumber)}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          )}
          {pageInfo.currentPageNumber < pageInfo.lastPageNumber && (
            <Button
              w={"40px"}
              onClick={() => pageClick(pageInfo.lastPageNumber)}
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </Button>
          )}
        </Flex>
      </Box>
    </Center>
  );
}
