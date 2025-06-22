import React from 'react';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import useAllQuestions from '../../hook/ViewAllQuestion';

const Home = () => {
    const questions=useAllQuestions(); 
    return (
        <div>
            <Navbar></Navbar>
         
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-4xl font-bold mb-4 text-green-600">Welcome to MyQuiz App!</h1>
                <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
                    Create, manage, and take quizzes easily. Add your own questions or view all available questions. Get started below!
                </p>
                <div className="flex gap-6">
                    <Link to="/addquestion">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-800 text-lg font-semibold">Add Question</button>
                    </Link>
                    <Link to="/see">
                        <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-800 text-lg font-semibold">View Questions {questions.length}</button>
                    </Link>
                    <Link to="/quiz">
                        <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-800 text-lg font-semibold">Start Quiz Now</button>
                    </Link>
                    <Link to="/score">
                        <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-800 text-lg font-semibold">Score</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;