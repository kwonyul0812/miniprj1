import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { Member } from "./page/member/Member.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";
import { LoginProvider } from "./component/LoginProvider.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { Board } from "./page/board/Board.jsx";
import { BoardWrite } from "./page/board/BoardWrite.jsx";
import axios from "axios";
import { BoardView } from "./page/board/BoardView.jsx";
import { BoardEdit } from "./page/board/BoardEdit.jsx";
import { MemberView } from "./page/member/MemberView.jsx";
import { MemberEditPassword } from "./page/member/MemberEditPassword.jsx";
import { MemberEditNickName } from "./page/member/MemberEditNickName.jsx"; // axios.interceptor 설정

// axios.interceptor 설정
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <BoardList />,
      },
      {
        path: "board",
        element: <Board />,
        children: [
          {
            path: "write",
            element: <BoardWrite />,
          },
          {
            path: "view/:id",
            element: <BoardView />,
          },
          {
            path: "edit/:id",
            element: <BoardEdit />,
          },
        ],
      },
      {
        path: "member",
        element: <Member />,
        children: [
          {
            path: "signup",
            element: <MemberSignup />,
          },
          {
            path: "login",
            element: <MemberLogin />,
          },
          {
            path: "view",
            element: <MemberView />,
          },
          {
            path: "edit/password",
            element: <MemberEditPassword />,
          },
          {
            path: "edit/nickName",
            element: <MemberEditNickName />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  );
}

export default App;
