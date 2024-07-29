import { Box, Heading } from "@chakra-ui/react";
import { CommentWrite } from "./CommentWrite.jsx";
import { CommentList } from "./CommentList.jsx";

export function CommentComponent({ boardId }) {
  return (
    <Box>
      <Box mb={7}>
        <Heading fontSize={"30px"}>댓글</Heading>
      </Box>
      <Box mb={7}>
        <CommentWrite boardId={boardId} />
      </Box>

      <CommentList />
    </Box>
  );
}
