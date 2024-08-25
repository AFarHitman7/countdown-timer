import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Timer from "./pages/timer";
import Target from "./pages/target";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Timer />,
    },
    {
      path: "/target",
      element: <Target />,
    },
  ]);
  return (
    <>
      {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
