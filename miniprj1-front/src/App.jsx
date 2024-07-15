import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { Member } from "./page/member/Member.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";

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
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
