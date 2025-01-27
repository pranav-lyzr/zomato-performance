const Guidelines = () => {
    const guidelines = [
      {
        title: "Quality & Accuracy of Work",
        description: [
          "Evaluate the consistency and precision with which tasks are completed.",
          "Look for error rates, rework frequency, and adherence to standards."
        ]
      },
      {
        title: "Productivity & Timeliness",
        description: [
          "Assess how efficiently the individual meets deadlines.",
          "Consider output volume (where relevant) and time management skills."
        ]
      },
      {
        title: "Technical/Role-Specific Expertise",
        description: [
          "Gauge mastery of requisite skills or tools for the position.",
          "Look at evidence of ongoing professional development or upskilling."
        ]
      },
      {
        title: "Problem-Solving & Initiative",
        description: [
          "Observe how the candidate identifies, analyzes, and resolves issues.",
          "Note any examples of proactive thinking, creativity, or innovation."
        ]
      }
    ];
  
    return (
      <div className="p-8 flex-1 overflow-auto pl-80">
        <h1 className="text-3xl font-bold mb-6 pl-80">Analysis Guidelines</h1>
        
        <div className="grid gap-6">
          {guidelines.map((guideline, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-4">{guideline.title}</h2>
              <ul className="space-y-2">
                {guideline.description.map((desc, i) => (
                  <li key={i} className="text-gray-600">• {desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Guidelines;