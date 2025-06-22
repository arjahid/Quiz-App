import { useState, useEffect } from 'react';

const useAllQuestions = () => {
    const [questions, setAllQuestions] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/api/questions')
            .then(res => res.json())
            .then(data => {
                setAllQuestions(data);
                console.log(data);
            });
    }, []);
    return questions;
};

export default useAllQuestions;