import { useMemo, useState } from "react";
import Pagination from "../../components/Pagination";
import { ChevronDown, Filter, RotateCcw } from "lucide-react";

// Data tạm
const names = [
  "Luna Green",
  "Oliver Woods",
  "Emma Stone",
  "Noah River",
  "Ava Bloom",
  "Ethan Moss",
  "Mia Forest",
  "Liam Lake",
  "Sophia Hill",
  "James Sky",
];
const orderTypes = ["Premium Monthly", "Premium Annually", "Premium Tree"];
const orderStatuses = ["Completed", "Processing", "Failed"];
const mockOrders = Array.from({ length: 120 }, (_, i) => {
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - i * 3);

  return {
    id: String(i + 1).padStart(5, "0"),
    name: names[i % names.length],
    address: `${100 + i} Green Street`,
    date: randomDate,
    type: orderTypes[i % 3],
    status: orderStatuses[i % 3],
  };
});

// Hết data tạm

const PAGE_SIZE = 9;

export default function OrderManagement() {
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [sortNewest, setSortNewest] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState<string | null>(null);
  // Filter and Sort
  const filteredOrders = mockOrders
    .filter((order) => {
      // Date filter
      if (dateFilter !== "all") {
        const now = new Date();
        const diff =
          (now.getTime() - order.date.getTime()) / (1000 * 60 * 60 * 24);

        if (dateFilter === "week" && diff > 7) return false;
        if (dateFilter === "month" && diff > 30) return false;
        if (dateFilter === "year" && diff > 365) return false;
      }

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(order.type))
        return false;

      // Status filter
      if (selectedStatus.length > 0 && !selectedStatus.includes(order.status))
        return false;

      return true;
    })
    .sort((a, b) =>
      sortNewest
        ? b.date.getTime() - a.date.getTime()
        : a.date.getTime() - b.date.getTime(),
    );

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredOrders.slice(start, start + PAGE_SIZE);
  }, [filteredOrders, currentPage]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
      </div>

      {/* Filter and Sorting */}
      <div className="mb-6 bg-white rounded-xl border border-gray-200/70 inline-flex items-center text-sm shadow-sm">
        <div className="px-4 py-3 border-r bg-gray-50">
          <Filter size={16} />
        </div>
        <div className="px-4 py-3 border-r text-gray-500">Filter By</div>

        {/* FILTER DATE */}
        <div className="relative border-r">
          <button
            onClick={() => setOpen(open === "date" ? null : "date")}
            className="px-4 py-3 flex items-center gap-2 hover:bg-gray-50">
            Date <ChevronDown size={14} />
          </button>

          {open === "date" && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-white border rounded-lg shadow-lg z-50">
              {[
                { label: "Last week", value: "week" },
                { label: "Last month", value: "month" },
                { label: "Last year", value: "year" },
              ].map((item) => (
                <div
                  key={item.value}
                  onClick={() => {
                    setDateFilter(item.value);
                    setCurrentPage(1);
                    setOpen(null);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FILTER ORDER TYPE */}
        <div className="relative border-r">
          <button
            onClick={() => setOpen(open === "type" ? null : "type")}
            className="px-4 py-3 flex items-center gap-2 hover:bg-gray-50">
            Order Type <ChevronDown size={14} />
          </button>

          {open === "type" && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border rounded-lg shadow-lg z-50 p-3 space-y-2">
              {["Premium Monthly", "Premium Annually", "Premium Tree"].map(
                (item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(item)}
                      onChange={() => {
                        setSelectedTypes((prev) =>
                          prev.includes(item)
                            ? prev.filter((t) => t !== item)
                            : [...prev, item],
                        );
                        setCurrentPage(1);
                      }}
                    />
                    {item}
                  </label>
                ),
              )}
            </div>
          )}
        </div>

        {/* FILTER ORDER STATUS */}
        <div className="relative border-r">
          <button
            onClick={() => setOpen(open === "status" ? null : "status")}
            className="px-4 py-3 flex items-center gap-2 hover:bg-gray-50">
            Order Status <ChevronDown size={14} />
          </button>

          {open === "status" && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-50 p-3 space-y-2">
              {["Completed", "Processing", "Failed"].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(item)}
                    onChange={() => {
                      setSelectedStatus((prev) =>
                        prev.includes(item)
                          ? prev.filter((s) => s !== item)
                          : [...prev, item],
                      );
                      setCurrentPage(1);
                    }}
                  />
                  {item}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* SORT */}
        <button
          onClick={() => setSortNewest(!sortNewest)}
          className="px-4 py-3 border-r hover:bg-gray-50">
          Sort by Date {sortNewest ? "↓" : "↑"}
        </button>

        {/* RESET */}
        <button
          onClick={() => {
            setDateFilter("all");
            setSelectedTypes([]);
            setSelectedStatus([]);
            setSortNewest(true);
            setCurrentPage(1);
          }}
          className="px-4 py-3 text-red-500 flex items-center gap-2 hover:bg-red-50">
          <RotateCcw size={14} />
          Reset Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black text-[#BDFF66] text-sm">
            <tr>
              <th className="p-4">ID</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>DATE</th>
              <th>TYPE</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{order.id}</td>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.date.toLocaleDateString()}</td>
                <td>{order.type}</td>
                <td>
                  <span
                    className={`inline-flex items-center justify-center w-24 h-7 text-xs rounded-md font-medium ${
                      order.status === "Completed"
                        ? "bg-black text-lime-400"
                        : order.status === "Processing"
                          ? "bg-purple-200 text-purple-700"
                          : "bg-red-200 text-red-600"
                    }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer and Pagination */}
      <div className="flex justify-between items-center p-4 text-sm">
        <span>
          Showing {(currentPage - 1) * PAGE_SIZE + 1}–
          {Math.min(currentPage * PAGE_SIZE, filteredOrders.length)} of{" "}
          {filteredOrders.length}
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
