import React, { useState } from 'react';
import { Form } from 'react-router-dom';

const QuestionForm = () => {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctIndex, setCorrectIndex] = useState(0);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newQuestion = {
            question,
            options,
            correctAnswer: options[correctIndex],
        };
        console.log("New Question Added:", newQuestion);
        setQuestion("");
        setOptions(["", "", "", ""]);
        setCorrectIndex(0);
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a new question</h2>
            <input type="text" value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder='Enter question'
                className='w-full border px-3 py-2 rounded'
                required />
            {
                options.map((option, idx) => (
                    <div key={idx} className='flex items-center gap-2'>
                        <input type='text'
                            value={option}
                            onChange={(e) => handleOptionChange(idx, e.target.value)}
                            placeholder={`Option ${idx + 1}`}
                            className='flex-1 border px-3 py-2 rounded'
                            required
                        />
                        <input type='radio'
                            name='correct'
                            checked={correctIndex === idx}
                            onChange={() => setCorrectIndex(idx)}
                            className='h-4 w-4' />
                    </div>
                ))
            }
            <button type='submit'
                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800'
            >Add Question</button>
        </form>
    );
};

export default QuestionForm;