import { FileText } from "lucide-react";

const Reports = () => {
  const reports = [
    { id: "EMP001", name: "Sarah Johnson", team: "Frontend Development", date: "2024-12-15" },
    { id: "EMP002", name: "Michael Chen", team: "Backend Development", date: "2024-11-30" },
    { id: "EMP003", name: "Emily Rodriguez", team: "UX Design", date: "2024-12-10" },
    { id: "EMP004", name: "David Kim", team: "DevOps", date: "2024-12-05" },
    { id: "EMP005", name: "Rachel Thompson", team: "Product Management", date: "2024-11-25" },
  ];

  return (
    <div className="p-8 overflow-auto pl-80">
      <h1 className="text-3xl font-bold mb-6">Performance Reports</h1>
      
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-gray-50">
                <th className="h-12 px-4 text-left align-middle font-medium text-purple-500">Employee ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-purple-500">Employee Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-purple-500">Team</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-purple-500">Analysis Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-purple-500">Report</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {reports.map((report) => (
                <tr key={report.id} className="border-b transition-colors hover:bg-purple-50">
                  <td className="p-4 align-middle">{report.id}</td>
                  <td className="p-4 align-middle">{report.name}</td>
                  <td className="p-4 align-middle">{report.team}</td>
                  <td className="p-4 align-middle">{report.date}</td>
                  <td className="p-4 align-middle">
                    <button className="text-purple-500 hover:text-pruple-800">
                      <FileText className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;