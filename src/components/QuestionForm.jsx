import React, { useState } from "react";
import { Form } from "react-router-dom";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      options,
      correctAnswer: options[correctIndex],
    };
    try {
      const res = await fetch('http://localhost:3000/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });
      const data = await res.json();
      console.log("Question added successfully:", data);
      alert("Question added successfully!");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectIndex(0);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };
  return (
   <div className="w-full max-w-xl mx-auto p-4 sm:p-8 bg-white rounded shadow-md mt-6">
     <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl text-black font-bold mb-4 text-center">Add a new question</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter question"
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <div className="space-y-3">
        {options.map((option, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Option ${idx + 1}`}
              className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
              required
            />
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="correct"
                checked={correctIndex === idx}
                onChange={() => setCorrectIndex(idx)}
                className="h-4 w-4"
              />
              Correct
            </label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors text-lg font-semibold"
      >
        Add Question
      </button>
    </form>
   </div>
  );
};

export default QuestionForm;
