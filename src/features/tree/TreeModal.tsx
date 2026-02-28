import { X } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function TreeModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[800px] rounded-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-xl hover:text-red-500">
          <X size={32} />
        </button>

        <h2 className="text-2xl font-bold mb-8">Add New Tree</h2>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="text-sm">Tree Name</label>
              <input
                className="w-full border rounded-lg px-4 py-2 mt-1"
                placeholder="New Tree"
              />
            </div>

            <div>
              <label className="text-sm">Category</label>
              <select className="w-full border rounded-lg px-4 py-2 mt-1">
                <option>Basic</option>
                <option>Rare</option>
                <option>Super Rare</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm">3D Model Upload</label>

            <div className="bg-lime-300 rounded-xl p-10 text-center mt-2">
              Drag file here
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-lg transition-all duration-200 hover:scale-105 active:scale-95">
            CANCEL
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-black text-[#BDFF66] rounded-lg transition-all duration-200 hover:scale-105 active:scale-95">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
