import { useEffect, useState } from "react";

export default function StartQuiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);
  useEffect(() => {
  if (isFinished) {
    // POST result to backend
    fetch("http://localhost:3000/api/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: "Guest", // Later use Firebase user displayName/email
        score: score,
        total: questions.length
      })
    })
    .then(res => res.json())
    .then(data => console.log("✅ Score saved:", data))
    .catch(err => console.error("❌ Error saving score:", err));
  }
}, [isFinished]);


  const handleNext = () => {
    if (selected === questions[current].correctAnswer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (questions.length === 0) return <p>Loading...</p>;

  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Quiz Completed!</h2>
        <p className="text-lg font-semibold text-blue-700">Your Score: <span className="text-green-600">{score}</span> / {questions.length}</p>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-800">
        Question {current + 1} of {questions.length}
      </h2>
      <p className="mb-4 text-lg font-semibold text-gray-800">{q.question}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(opt)}
            className={`w-full text-left px-4 py-2 border rounded transition-colors duration-150
              ${selected === opt
                ? "bg-blue-600 text-white font-bold border-blue-700"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"}
            `}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selected === null}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {current + 1 === questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
