import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import QuestionForm from "../components/QuestionForm";


import Score from "../components/Score";
import ViewQsn from "../components/viewQsn/ViewQsn";
import StartQuiz from "../components/starrQuiz";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <div>Error occurred</div>,
    children: [
      {
        path: "addquestion",
        element: <QuestionForm></QuestionForm>,
      },

      {
        path: "score",
        element: <Score></Score>,
      },
      {
        path:'see',
        element:<ViewQsn></ViewQsn>
      },
      {
        path:'/quiz',
        element:<StartQuiz></StartQuiz>
      }
      
    ],
  },
]);

export default router;
