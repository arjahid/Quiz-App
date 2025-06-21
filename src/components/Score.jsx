import { useEffect, useState } from "react";

export default function ScoreHistory() {
  const [results, setResults] = useState([]);

  // Fetch all results from backend
  const fetchResults = () => {
    fetch("http://localhost:3000/api/results")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Results:", data);
        setResults(data);
      })
      .catch((err) => console.error("Error fetching results:", err));
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // Delete handler
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;

    fetch(`http://localhost:3000/api/results/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setResults((prev) => prev.filter((r) => r._id !== id));
      })
      .catch((err) => console.error("Error deleting result:", err));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-3 mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">📊 Quiz Score History</h2>

      {results.length === 0 ? (
        <p className="text-gray-500 text-center">No quiz results yet.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100 text-blue-800">
              <th className="border px-4 py-2 font-semibold">#</th>
              <th className="border px-4 py-2 font-semibold">User</th>
              <th className="border px-4 py-2 font-semibold">Score</th>
              <th className="border px-4 py-2 font-semibold">Total</th>
              <th className="border px-4 py-2 font-semibold">Date</th>
              <th className="border px-4 py-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, i) => (
              <tr key={result._id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border px-4 py-2 text-gray-700">{i + 1}</td>
                <td className="border px-4 py-2 text-gray-800 font-medium">{result.user}</td>
                <td className="border px-4 py-2 text-green-700 font-bold">{result.score}</td>
                <td className="border px-4 py-2 text-gray-700">{result.total}</td>
                <td className="border px-4 py-2 text-gray-600">{new Date(result.date).toLocaleString()}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(result._id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                    title="Delete this result"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
