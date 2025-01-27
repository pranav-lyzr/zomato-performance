import { useState, useEffect } from "react";
import { CloudCog, Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


// Simulated API call
const fetchEmployeeData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 second delay
  return {
    name: "John Doe",
    reviewPeriod: "Q1 2025",
    role: "Senior Software Engineer",
    manager: "Jane Smith",
    department: "Product Engineering",
    executiveSummary: "John has had a strong quarter, demonstrating a high level of initiative and consistent technical expertise. He successfully led the backend integration for Project Alpha, resulting in a 10% increase in system reliability. John consistently offered support to junior developers and maintained open communication with cross-functional teams.",
    achievements: [
      "Led the implementation of the new API for Project Alpha, finishing one week ahead of schedule.",
      "Mentored two junior engineers, providing weekly code reviews and guidance on best practices."
    ],
    strengths: [
      "Collaboration: John coordinated effectively with the front-end team and product managers.",
      "Technical Competency: Displayed in-depth knowledge of cloud architecture and microservices.",
      "Mentorship & Leadership: Proactively helped newcomers and facilitated knowledge-sharing sessions."
    ]
  };
};

const LoadingState = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="h-4 w-20 mb-2 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-40 mb-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-4 w-20 mb-2 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
          </div>
        ))}
      </div>
      
      <div className="space-y-6">
        <section>
          <div className="h-8 w-48 mb-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-24 w-full bg-gray-200 animate-pulse rounded"></div>
        </section>
        
        <section>
          <div className="h-8 w-48 mb-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                <div className="h-6 w-32 mb-3 bg-gray-200 animate-pulse rounded"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const Employee = () => {
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const apiResponses = localStorage.getItem("apiResponses");
  const zomatoData = localStorage.getItem("zomatoData");
  const apiUrl = "https://agent.api.lyzr.app/v2/chat/";
  const lyzrApiKey = "lyzr-eH51wUqvcJY5fRl9yFZihZIx";
  const sessionId = "unique-session-id";
  let hasFetchedData = false;


  useEffect(() => {
    const loadData = async () => {
      if (hasFetchedData) return;
      hasFetchedData = true;
      try {
        // Check if data exists in local storage
        const cachedData = localStorage.getItem("employeeData");
  
        if (cachedData) {
          // If data is found, parse it and set it in the state
          console.log("Data loaded from local storage.");
          setEmployee(JSON.parse(cachedData));
          setIsLoading(false);
          return;
        }
  
        // If no data in local storage, fetch from API
        console.log("Fetching data from API...");
        const finalResponse = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": lyzrApiKey,
          },
          body: JSON.stringify({
            user_id: "harshit@lyzr.ai",
            agent_id: "6791e8ca61f92e3cfefe1aa7",
            session_id: sessionId,
            message: apiResponses + zomatoData,
          }),
        });
  
        const rawData = await finalResponse.json();
  
        console.log("Final API response:", rawData);
  
        // Store the fetched data in local storage
        localStorage.setItem("employeeData", JSON.stringify(rawData));
        const thingsResponse = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": lyzrApiKey,
          },
          body: JSON.stringify({
            user_id: "harshit@lyzr.ai",
            agent_id: "679731ef8560205374fd7400",
            session_id: sessionId,
            message: apiResponses + zomatoData,
          }),
        });
  
        const thingsData = await thingsResponse.json();
        localStorage.setItem("ThingsToWorkOn", JSON.stringify(thingsData));
        console.log("Things to work on:", thingsData);
  
        // Update the state with the fetched data
        setEmployee(rawData);


        
      } catch (error) {
        console.error("Error in final API call:", error);
      }
  
      setIsLoading(false);
    };
  
    loadData();
  }, []);
      

  return (
    <div className="p-8 flex-1 overflow-auto pl-80">
      <h1 className="text-2xl font-bold mb-6">Performance Report</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* <h2 className="text-xl font-semibold mb-6">Employee Performance Review</h2> */}

        {isLoading ? (
          <LoadingState />
        ) : (
          // <>
          //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          //     <div>
          //       <p className="text-sm text-gray-500">Employee</p>
          //       <p className="font-medium">{employee?.name}</p>
          //       <p className="text-sm text-gray-500 mt-2">Review Period</p>
          //       <p className="font-medium">{employee?.reviewPeriod}</p>
          //     </div>
          //     <div>
          //       <p className="text-sm text-gray-500">Role</p>
          //       <p className="font-medium">{employee?.role}</p>
          //       <p className="text-sm text-gray-500 mt-2">Manager</p>
          //       <p className="font-medium">{employee?.manager}</p>
          //     </div>
          //     <div>
          //       <p className="text-sm text-gray-500">Department</p>
          //       <p className="font-medium">{employee?.department}</p>
          //     </div>
          //   </div>

          //   <div className="space-y-6">
          //     <section>
          //       <h3 className="text-lg font-semibold mb-3">Executive Summary</h3>
          //       <p className="text-gray-700 leading-relaxed">{employee?.executiveSummary}</p>
          //     </section>

          //     <section>
          //       <h3 className="text-lg font-semibold mb-3">Performance Highlights</h3>
          //       <div className="space-y-4">
          //         <div>
          //           <h4 className="font-medium mb-2">Key Achievements</h4>
          //           <ul className="list-disc list-inside space-y-2 text-gray-700">
          //             {employee?.achievements.map((achievement, index) => (
          //               <li key={index}>{achievement}</li>
          //             ))}
          //           </ul>
          //         </div>
          //         <div>
          //           <h4 className="font-medium mb-2">Strengths & Skills Demonstrated</h4>
          //           <ul className="list-disc list-inside space-y-2 text-gray-700">
          //             {employee?.strengths.map((strength, index) => (
          //               <li key={index}>{strength}</li>
          //             ))}
          //           </ul>
          //         </div>
          //         <div>
          //           <h4 className="font-medium mb-2">Areas for Improvement</h4>
          //           <ul className="list-disc list-inside space-y-2 text-gray-700">
          //             {employee?.areasForImprovement.map((area, index) => (
          //               <li key={index}>{area}</li>
          //             ))}
          //           </ul>
          //         </div>
          //         <div>
          //           <h4 className="font-medium mb-2">Recommendations</h4>
          //           <ul className="list-disc list-inside space-y-2 text-gray-700">
          //             {employee?.recommendations.map((recommendation, index) => (
          //               <li key={index}>{recommendation}</li>
          //             ))}
          //           </ul>
          //         </div>
          //       </div>
          //     </section>
          //   </div>
          // </>

          <div className="markdown-body"
            style={{
              backgroundColor: "#ffffff", // White background
              color: "#000000", // Black text color
              padding: "16px", // Add padding for readability
              borderRadius: "8px", // Optional: rounded corners
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {employee.response}
            </ReactMarkdown>
          </div>

        )}
      </div>
    </div>
  );
};

export default Employee;
