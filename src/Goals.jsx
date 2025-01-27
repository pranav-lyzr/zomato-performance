import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useEffect } from "react";


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



const Goals = () => {
    const goals = [
      {
        title: "Front-End Skill Development",
        context: "John has primarily focused on backend tasks. Expanding front-end knowledge will position him for a full-stack leadership role.",
        steps: [
          "Enroll in React.js workshop offered next month.",
          "Pair with a front-end colleague for code reviews weekly.",
        ],
        metrics: [
          "Complete two front-end user stories in Project Beta within the next quarter.",
          "Maintain under 5 bugs in front-end PR reviews.",
        ],
        resources: "Internal developer wiki, recommended React.js tutorial.",
      }
    ];

    const [Goal, setGoal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    


    useEffect(() => {
        const loadData =  () => {
          // Check if data exists in local storage
          const cachedData = localStorage.getItem("ThingsToWorkOn");
    
          if (cachedData) {
            // If data is found, parse it and set it in the state
            console.log("Data loaded from local storage.");
            setGoal(JSON.parse(cachedData));
            setIsLoading(false);
            return;
          }
        };
      
        loadData();
      }, []);
  
    return (
      <div className="p-8  flex-1 overflow-auto pl-80">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Things to Work On</h1>
            {/* <p className="text-gray-500 mb-6">Review Period: Q1 2025 | Manager: Jane Smith</p> */}
          </div>
        </div>
  
        {/* <div className="space-y-6">
          {goals.map((goal, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-semibold">{goal.title}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Context</h3>
                  <p className="text-gray-600">{goal.context}</p>
                </div>
  
                <div>
                  <h3 className="text-lg font-medium mb-2">Actionable Steps</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {goal.steps.map((step, i) => (
                      <li key={i} className="text-gray-600">{step}</li>
                    ))}
                  </ul>
                </div>
  
                <div>
                  <h3 className="text-lg font-medium mb-2">Success Metrics</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {goal.metrics.map((metric, i) => (
                      <li key={i} className="text-gray-600">{metric}</li>
                    ))}
                  </ul>
                </div>
  
                <div>
                  <h3 className="text-lg font-medium mb-2">Resources</h3>
                  <p className="text-gray-600">{goal.resources}</p>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

          {isLoading ? (
            <LoadingState />
          ) : (
            
  
            <div className="markdown-body"
              style={{
                backgroundColor: "#ffffff", // White background
                color: "#000000", // Black text color
                padding: "16px", // Add padding for readability
                borderRadius: "8px", // Optional: rounded corners
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {Goal.response}
              </ReactMarkdown>
            </div>
  
          )}
        </div>

      </div>
    );
  };
  
  export default Goals;