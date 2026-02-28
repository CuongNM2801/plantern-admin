import { Search, SquarePen, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import Pagination from "../../components/Pagination";
import TreeModal from "./TreeModal";

const mockTrees = Array.from({ length: 4780 }, (_, i) => ({
  id: i + 1,
  image: "https://via.placeholder.com/32",
  name: `Tree ${i + 1}`,
  category: i % 2 === 0 ? "Basic" : "Rare",
  price: i % 2 === 0 ? 0 : i %3 === 10000 ? 50000 : 100000,
  sales: Math.floor(Math.random() * 500),
  uploadDate: "13/12/2025",
}));

const PAGE_SIZE = 9;

export default function TreeManagement() {
  const [trees] = useState(mockTrees);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter search
  const filteredTrees = useMemo(() => {
    return trees.filter((tree) =>
      tree.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [trees, search]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTrees.length / PAGE_SIZE);

  const paginatedTrees = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTrees.slice(start, start + PAGE_SIZE);
  }, [filteredTrees, currentPage]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tree Management</h1>

        <div className="flex gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search tree"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-full pl-9 pr-4 py-2 text-sm"
            />
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-[#BDFF66] px-5 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 active:scale-95">
            ADD TREE
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black text-[#BDFF66] text-sm">
            <tr>
              <th className="p-4">IMAGE</th>
              <th>TREE NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>SALES</th>
              <th>UPLOAD DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTrees.map((tree) => (
              <tr key={tree.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <img src={tree.image} className="w-12 h-12 rounded-lg" />
                </td>
                <td>{tree.name}</td>
                <td>{tree.category}</td>
                <td>{tree.price} đ</td>
                <td>{tree.sales}</td>
                <td>{tree.uploadDate}</td>
                <td className="space-x-2">
                  <button className="px-2 py-1 border rounded hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"><SquarePen size={20} /></button>
                  <button className="px-2 py-1 border rounded hover:bg-red-200 transition-all duration-200 hover:scale-105 active:scale-95">
                    <Trash2 size={20} color="tomato" />
                  </button>
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
          {Math.min(currentPage * PAGE_SIZE, filteredTrees.length)} of{" "}
          {filteredTrees.length}
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {isOpen && <TreeModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}
