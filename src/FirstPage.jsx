import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
  const [formData, setFormData] = useState({
    selfAndManagerAssessment: "",
    slackMessages: "",
    zoomMeetings: "",
    feedbackAnalysis: "",
    psychometricAnalysis: "",
  });
  localStorage.removeItem("chatHistory");
  localStorage.removeItem("jointResponse");
  localStorage.removeItem("zomatoData");
  localStorage.removeItem("employeeData");


  const [error, setError] = useState(""); // State to manage error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error message on input change
  };

  const handleNext = () => {
    // Check if any field is empty
    const isFormValid = Object.values(formData).every((value) => value.trim() !== "");
    if (!isFormValid) {
      setError("All fields must be filled out before proceeding.");
      return;
    }
    navigate("/next", { state: { formData } });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Performance Report</h1>
        <p className="text-gray-600 mb-4">Please fill out the details below to provide an in-depth performance review for the employee.</p>
        <form className="space-y-6">
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Manager Assessment</label>
            <textarea
              name="selfAndManagerAssessment"
              value={formData.selfAndManagerAssessment}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="How do you rate your own performance?"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Slack Messages Analysis Agent</label>
            <textarea
              name="slackMessages"
              value={formData.slackMessages}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Insights from Slack messages (e.g., collaboration, communication)"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Zoom Meetings Agent</label>
            <textarea
              name="zoomMeetings"
              value={formData.zoomMeetings}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Employee's participation and performance in Zoom meetings"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">HR Feedback Analysis Agent</label>
            <textarea
              name="feedbackAnalysis"
              value={formData.feedbackAnalysis}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Summary of HR feedback from peers or managers"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Psychometric Analysis</label>
            <textarea
              name="psychometricAnalysis"
              value={formData.psychometricAnalysis}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Psychometric test results or analysis"
              rows="4"
            ></textarea>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 w-full"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default FirstPage;
