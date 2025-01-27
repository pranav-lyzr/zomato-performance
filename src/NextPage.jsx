import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NextPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};
  localStorage.removeItem("chatHistory");
  localStorage.removeItem("employeeData");


  const [zomatoPerformance, setZomatoPerformance] = useState("");
  const [apiResponses, setApiResponses] = useState("");
  const [allResponsesReceived, setAllResponsesReceived] = useState(false);
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(""); // Validation error state
  const [currentAgent, setCurrentAgent] = useState("");
  const [completedAgents, setCompletedAgents] = useState([]);

  const apiUrl = "https://agent.api.lyzr.app/v2/chat/";
  const lyzrApiKey = "lyzr-eH51wUqvcJY5fRl9yFZihZIx";

  const agentNames = {
    slack: "Slack Analysis Agent",
    zoom: "Zoom Analysis Agent",
    manager: "Manager Assessment Agent",
    hr: "HR Analysis Agent",
    psychometric: "Psychometric Analysis Agent",
  };

  const agentIds = {
    SLACK_ANALYSIS_AGENT: "6791e74e61f92e3cfefe1a6d",
    ZOOM_ANALYSIS_AGENT: "6791e7f961f92e3cfefe1a8f",
    MANAGER_ASSESMENT_AGENT: "6791e7e061f92e3cfefe1a89",
    HR_ANALYSIS_AGENT: "6791e79161f92e3cfefe1a79",
    PSHYCOMETRIC_AGENT: "6791e7c361f92e3cfefe1a83",
    FINAL_AGENT: "6791e8ca61f92e3cfefe1aa7",
  };

  const sessionId = "unique-session-id"; // Replace with your unique session ID

  useEffect(() => {
    const storedResponses = localStorage.getItem("jointResponse");
    if (storedResponses) {
      setApiResponses(storedResponses);
      setAllResponsesReceived(true);
      setLoading(false);
    } else {
      let responseCount = 0;
      const totalResponses = 5;

      async function makeApiCall(agentId, message, key) {
        try {
          setCurrentAgent(key);
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-api-key": lyzrApiKey,
            },
            body: JSON.stringify({
              user_id: "harshit@lyzr.ai",
              agent_id: agentId,
              session_id: sessionId,
              message,
            }),
          });

          const data = await response.json();
          console.log(`Response for agent ${key}:`, data);

          setApiResponses((prev) => {
            const updatedResponses = prev + (data.response || "");
            localStorage.setItem("jointResponse", updatedResponses);
            return updatedResponses;
          });

          setCompletedAgents((prev) => [...prev, key]);
          responseCount++;
          if (responseCount === totalResponses) {
            setLoading(false);
          }
        } catch (error) {
          console.log(`Error for agent ${agentId}:`, error);
        }
      }

      if (formData) {
        makeApiCall(agentIds.SLACK_ANALYSIS_AGENT, formData.slackMessages, "slack");
        makeApiCall(agentIds.ZOOM_ANALYSIS_AGENT, formData.zoomMeetings, "zoom");
        makeApiCall(agentIds.MANAGER_ASSESMENT_AGENT, formData.selfAndManagerAssessment, "manager");
        makeApiCall(agentIds.HR_ANALYSIS_AGENT, formData.feedbackAnalysis, "hr");
        makeApiCall(agentIds.PSHYCOMETRIC_AGENT, formData.psychometricAnalysis, "psychometric");
      }
    }
  }, [formData]);

  useEffect(() => {
    if (
      apiResponses.slack &&
      apiResponses.zoom &&
      apiResponses.manager &&
      apiResponses.hr &&
      apiResponses.psychometric
    ) {
      setAllResponsesReceived(true);
      localStorage.setItem("apiResponses", JSON.stringify(apiResponses));
    }
  }, [apiResponses]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if zomatoPerformance is empty
    if (!zomatoPerformance.trim()) {
      setError("Zomato Performance Analysis Guidelines cannot be empty.");
      return;
    }

    if (loading) {
      alert("Please wait while responses are being fetched.");
      return;
    }

    // If validation passes, proceed to the next step
    setError(""); // Clear any previous errors
    console.log("Employee Performance Report:", zomatoPerformance);
    localStorage.setItem("zomatoData", JSON.stringify(zomatoPerformance));

    navigate("/performance-report", {
      state: {
        formData: {
          ...formData,
          zomatoPerformance,
          apiResponses,
        },
      },
    });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Employee Performance Report
        </h1>

        {/* Loader */}
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-6 min-h-[200px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
            <div className="text-center space-y-4">
              <p className="text-lg font-semibold text-purple-600">
                {/* Currently processing: {agentNames[currentAgent] || "Initializing..."} */}
                Processing 
              </p>
              <div className="space-y-2">
                {Object.entries(agentNames).map(([key, name]) => (
                  <div
                    key={key}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <span
                      className={`w-4 h-4 rounded-full ${
                        completedAgents.includes(key)
                          ? "bg-green-500"
                          : currentAgent === key
                          ? "bg-purple-500 animate-pulse"
                          : "bg-gray-300"
                      }`}
                    ></span>
                    <span
                      className={
                        completedAgents.includes(key)
                          ? "text-green-600"
                          : currentAgent === key
                          ? "text-purple-600"
                          : "text-gray-500"
                      }
                    >
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Form displayed only when loading is false
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Zomato Performance Analysis Guidelines
              </label>
              <textarea
                name="zomatoPerformance"
                value={zomatoPerformance}
                onChange={(e) => setZomatoPerformance(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Employee Performance Analyst Agent"
                style={{ height: "60vh" }}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NextPage;
