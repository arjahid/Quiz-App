import React, { useEffect, useState } from "react";

const ViewQsn = () => {
  const [questions, setQuestions] = useState([]);

  // Fetch all questions from backend
  const fetchQuestions = () => {
    fetch("http://localhost:3000/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("❌ Error fetching questions:", err));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Delete question handler
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    fetch(`http://localhost:3000/api/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        // Remove deleted question from state to update UI
        setQuestions((prev) => prev.filter((q) => q._id !== id));
      })
      .catch((err) => console.error("❌ Error deleting question:", err));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-4 sm:p-8 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        All Questions ({questions.length})
      </h2>
      {questions.length === 0 ? (
        <p className="text-gray-500 text-center">No questions found.</p>
      ) : (
        <ul className="space-y-6">
          {questions.map((q, index) => (
            <li key={q._id} className="border p-4 rounded relative">
              <button
                onClick={() => handleDelete(q._id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                🗑️ Delete
              </button>
              <h3 className="font-semibold mb-2 text-gray-800">
                {index + 1}. {q.question}
              </h3>
              <ul className="ml-5 list-disc">
                {q.options.map((opt, idx) => (
                  <li
                    key={idx}
                    className={
                      opt === q.correctAnswer
                        ? "text-green-700 font-bold bg-green-50 rounded px-2 py-1"
                        : "text-gray-700 hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                    }
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewQsn;
