
const deals = [
  {
    tree: "Rose Mary",
    user: "Rosie Pearson",
    date: "12.09.2019 - 12:53 PM",
    amount: "40.000",
    status: "Delivered",
  },
  {
    tree: "Sunflower",
    user: "John Doe",
    date: "12.09.2019 - 12:53 PM",
    amount: "50.000",
    status: "Delivered",
  },
];

export default function DealsTable() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
      <h3 className="text-lg font-semibold mb-4">Deals Details</h3>

      <table className="w-full text-left">
        <thead className="bg-black text-[#BDFF66]">
          <tr>
            <th className="p-3">Tree Name</th>
            <th className="p-3">User</th>
            <th className="p-3">Date - Time</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {deals.map((deal, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{deal.tree}</td>
              <td className="p-3">{deal.user}</td>
              <td className="p-3">{deal.date}</td>
              <td className="p-3">{deal.amount}</td>
              <td className="p-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {deal.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
