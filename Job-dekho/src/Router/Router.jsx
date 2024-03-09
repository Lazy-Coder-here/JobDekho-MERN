import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import PostJob from "../Pages/PostJob";
import Myjobs from "../Pages/Myjobs";
import SalaryEst from "../Pages/SalaryEst";
import UpdateJobs from "../Pages/UpdateJobs";
import Login from "../components/Login";
import JobDetails from "../Pages/JobDetails";
import SignUp from "../components/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/post-job", element: <PostJob /> },
      { path: "/my-job", element: <Myjobs /> },
      { path: "/salary", element: <SalaryEst /> },
      {
        path: "/edit-job/:id",
        element: <UpdateJobs />,
        loader: ({ params }) =>
        fetch(`https://jobdekho-mern.onrender.com/${params.id}`),
      },
      { path: "/job/:id", element: <JobDetails /> }
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  }
]);

export default router;
