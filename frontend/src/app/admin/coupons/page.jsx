export default function CouponsDashboard() {
  const coupons = [
    {
      id: 1,
      code: "WELCOME20",
      discount: "20%",
      type: "Percentage",
      usage: 54,
      limit: 100,
      expiry: "30 May 2026",
      status: "Active",
    },
    {
      id: 2,
      code: "FLAT500",
      discount: "₹500",
      type: "Flat",
      usage: 18,
      limit: 50,
      expiry: "18 May 2026",
      status: "Active",
    },
    {
      id: 3,
      code: "SUMMER10",
      discount: "10%",
      type: "Percentage",
      usage: 100,
      limit: 100,
      expiry: "10 May 2026",
      status: "Expired",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Coupons Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage discount coupons, offers and promotions.
          </p>
        </div>

        <button className="bg-black text-white px-5 py-3 rounded-2xl shadow hover:scale-105 transition">
          + Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-gray-500 text-sm">Total Coupons</p>
          <h2 className="text-4xl font-bold mt-2">24</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-gray-500 text-sm">Active Coupons</p>
          <h2 className="text-4xl font-bold mt-2">18</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-gray-500 text-sm">Expired</p>
          <h2 className="text-4xl font-bold mt-2">6</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-gray-500 text-sm">Total Redemptions</p>
          <h2 className="text-4xl font-bold mt-2">1.2K</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border mb-6 flex flex-col lg:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search coupon code..."
          className="border rounded-xl px-4 py-3 w-full lg:w-1/3 outline-none"
        />

        <div className="flex flex-wrap gap-3">
          <select className="border rounded-xl px-4 py-3 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Expired</option>
          </select>

          <select className="border rounded-xl px-4 py-3 outline-none">
            <option>Discount Type</option>
            <option>Percentage</option>
            <option>Flat</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Coupon Code
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Discount
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Type
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Usage
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Expiry Date
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon) => (
                <tr
                  key={coupon.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-5">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 tracking-wide">
                        {coupon.code}
                      </h3>
                    </div>
                  </td>

                  <td className="p-5 font-semibold text-gray-800">
                    {coupon.discount}
                  </td>

                  <td className="p-5">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                      {coupon.type}
                    </span>
                  </td>

                  <td className="p-5 text-gray-700">
                    {coupon.usage}/{coupon.limit}
                  </td>

                  <td className="p-5 text-gray-600">
                    {coupon.expiry}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        coupon.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {coupon.status}
                    </span>
                  </td>

                  <td className="p-5">
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition">
                        Edit
                      </button>

                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition">
                        Duplicate
                      </button>

                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Coupon Form */}
      <div className="bg-white rounded-3xl shadow-sm border p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Coupon
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="number"
            placeholder="Discount Value"
            className="border rounded-xl px-4 py-3 outline-none"
          />

          <select className="border rounded-xl px-4 py-3 outline-none">
            <option>Discount Type</option>
            <option>Percentage</option>
            <option>Flat</option>
          </select>

          <input
            type="number"
            placeholder="Usage Limit"
            className="border rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="date"
            className="border rounded-xl px-4 py-3 outline-none"
          />

          <button className="bg-black text-white rounded-xl px-5 py-3 hover:scale-105 transition">
            Create Coupon
          </button>
        </div>
      </div>
    </div>
  );
}
