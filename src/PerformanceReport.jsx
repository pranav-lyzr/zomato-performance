import Sidebar from "./Sidebar";
import Employee from "./Employee";

const PerformanceReport = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-auto"> 
        <Employee />
      </main>
    </div>
  );
};

export default PerformanceReport;