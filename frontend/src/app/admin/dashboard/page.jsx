"use client";

import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Star,
  TicketPercent,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹12,45,900",
    icon: DollarSign,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Total Orders",
    value: "1,248",
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Products",
    value: "324",
    icon: Package,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Customers",
    value: "872",
    icon: Users,
    color: "bg-orange-100 text-orange-700",
  },
];

const recentOrders = [
  {
    id: "#OD1001",
    customer: "Rahul Sharma",
    amount: "₹2,499",
    status: "Delivered",
  },
  {
    id: "#OD1002",
    customer: "Priya Singh",
    amount: "₹4,899",
    status: "Processing",
  },
  {
    id: "#OD1003",
    customer: "Anjali Verma",
    amount: "₹1,899",
    status: "Pending",
  },
  {
    id: "#OD1004",
    customer: "Rohit Kumar",
    amount: "₹6,999",
    status: "Cancelled",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-sm p-6 border"
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div className={`p-4 rounded-full ${item.color}`}>
                <item.icon size={28} />
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Middle */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        {/* Recent Orders */}

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border">

          <div className="p-5 border-b">
            <h2 className="font-semibold text-lg">
              Recent Orders
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr className="text-left">

                <th className="p-4">Order</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">{order.id}</td>

                  <td>{order.customer}</td>

                  <td>{order.amount}</td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Quick Stats */}

        <div className="space-y-6">

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-green-600" />
              <h3 className="font-semibold">
                Sales Growth
              </h3>
            </div>

            <h2 className="text-4xl font-bold mt-5">
              +24%
            </h2>

            <p className="text-gray-500 mt-2">
              Compared to last month
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <Star className="text-yellow-500" />
              <h3 className="font-semibold">
                Reviews
              </h3>
            </div>

            <h2 className="text-4xl font-bold mt-5">
              4.8
            </h2>

            <p className="text-gray-500">
              Average Rating
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <TicketPercent className="text-purple-600" />
              <h3 className="font-semibold">
                Active Coupons
              </h3>
            </div>

            <h2 className="text-4xl font-bold mt-5">
              12
            </h2>

            <p className="text-gray-500">
              Running Promotions
            </p>

          </div>

          <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
            <div className="flex gap-3">
              <AlertCircle className="text-red-600" />
              <div>
                <h3 className="font-semibold text-red-700">
                  Low Stock Alert
                </h3>

                <p className="text-sm mt-2 text-red-600">
                  8 products are almost out of stock.
                </p>

              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}