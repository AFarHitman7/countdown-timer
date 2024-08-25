import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Timer from "./pages/timer";
import Target from "./pages/target";

function App() {
  const router = createBrowserRouter([
    {
      path: "/countdown-timer/",
      element: <Timer />,
    },
    {
      path: "/countdown-timer/target",
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
