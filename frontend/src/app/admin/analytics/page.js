import {
  BarChart3,
  Users,
  ShoppingBag,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

export default function AnalyticsDashboard() {
  const topProducts = [
    {
      name: "Luxury Pink Bag",
      sales: 124,
      revenue: "₹2,48,000",
    },
    {
      name: "Black Leather Bag",
      sales: 98,
      revenue: "₹1,76,000",
    },
    {
      name: "Travel Mini Bag",
      sales: 72,
      revenue: "₹1,08,000",
    },
  ];

  const recentActivities = [
    "New order placed by Rahul Kumar",
    "Coupon WELCOME20 redeemed",
    "New user registered",
    "Order #ORD1025 marked as delivered",
    "Product stock updated",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Analytics Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Track sales, orders, customers and business performance.
          </p>
        </div>

        <button className="bg-black text-white px-5 py-3 rounded-2xl shadow hover:scale-105 transition">
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h2 className="text-4xl font-bold mt-2">₹8.4L</h2>
            </div>

            <div className="bg-gray-100 p-4 rounded-2xl">
              <IndianRupee size={30} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h2 className="text-4xl font-bold mt-2">547</h2>
            </div>

            <div className="bg-gray-100 p-4 rounded-2xl">
              <ShoppingBag size={30} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Customers</p>
              <h2 className="text-4xl font-bold mt-2">1,284</h2>
            </div>

            <div className="bg-gray-100 p-4 rounded-2xl">
              <Users size={30} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Growth</p>
              <h2 className="text-4xl font-bold mt-2">+18%</h2>
            </div>

            <div className="bg-gray-100 p-4 rounded-2xl">
              <TrendingUp size={30} />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Revenue Overview
            </h2>

            <BarChart3 size={24} />
          </div>

          <div className="h-[320px] flex items-end justify-between gap-4">
            {[40, 65, 30, 90, 55, 75, 100].map((height, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 w-full"
              >
                <div
                  className="w-full bg-black rounded-t-2xl"
                  style={{ height: `${height}%` }}
                ></div>

                <span className="text-sm text-gray-500">
                  {[
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                  ][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl border shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="border rounded-2xl p-4 hover:bg-gray-50 transition"
              >
                <p className="text-gray-700">{activity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-3xl border shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Top Selling Products
          </h2>

          <div className="space-y-5">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-2xl p-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {product.sales} sales
                  </p>
                </div>

                <h3 className="font-bold text-xl text-gray-800">
                  {product.revenue}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-3xl border shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Traffic Sources
          </h2>

          <div className="space-y-5">
            {[
              { source: "Instagram", value: "42%" },
              { source: "Google", value: "28%" },
              { source: "Direct", value: "18%" },
              { source: "Facebook", value: "12%" },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-700">
                    {item.source}
                  </p>

                  <p className="font-semibold text-gray-800">
                    {item.value}
                  </p>
                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-black h-full rounded-full"
                    style={{ width: item.value }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
