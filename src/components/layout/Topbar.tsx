import { Bell } from 'lucide-react'

export default function Topbar() {
  return (
    <div className="h-16 bg-white shadow-sm flex items-center justify-end px-6">
      <div className="flex items-center gap-6">
        <Bell size={20} />

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium">Jane Doe</p>
            <p className="text-gray-400 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
