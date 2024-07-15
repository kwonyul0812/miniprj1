import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { Member } from "./page/member/Member.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";
import { LoginProvider } from "./component/LoginProvider.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
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
          ],
        },
      ],
    },
  ]);

  return (
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  );
}

export default App;
