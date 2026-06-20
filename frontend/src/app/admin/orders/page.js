"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getBlogs = async () => {
      const response = await axios.get("http://localhost:5000/api/order/all");
      setOrders(response.data.data);
    };

    getBlogs();
  }, []);

  useEffect(() => {
    const getFilteredBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/order/filter",
          {
            params: {
              search: search || "",
              deliveryStatus:
                deliveryStatus === "All Status" ? "" : deliveryStatus,

              paymentStatus:
                paymentStatus === "Payment Status" ? "" : paymentStatus,
            },
          },
        );

        setOrders(response.data.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    getFilteredBlogs();
  }, [paymentStatus, deliveryStatus, search]);

  const delivered = orders.filter((order)=>order.orderStatus === "Delivered").length
  const pending = orders.filter((order)=>order.orderStatus === "Placed").length

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Orders Dashboard</h1>

          <p className="text-gray-500 mt-2">
            Manage all customer orders, payments and delivery status.
          </p>
        </div>

        <button className="bg-black text-white px-5 py-3 rounded-2xl shadow hover:scale-105 transition">
          Export Orders
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-4xl font-bold mt-2">{orders.length}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-gray-500 text-sm">Delivered</p>
          <h2 className="text-4xl font-bold mt-2">{delivered}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-4xl font-bold mt-2">{pending}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-4xl font-bold mt-2">₹8.4L</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border mb-6 flex flex-col lg:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-4 py-3 w-full lg:w-1/3 outline-none"
        />

        <div className="flex flex-wrap gap-3">
          <select
            value={deliveryStatus}
            onChange={(e) => setDeliveryStatus(e.target.value)}
            className="border rounded-xl px-4 py-3 outline-none"
          >
            <option>All Status</option>
            <option>Delivered</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Cancelled</option>
          </select>

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="border rounded-xl px-4 py-3 outline-none"
          >
            <option>Payment Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Refunded</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Order ID
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Customer
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Product
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Amount
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Payment
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="text-left p-5 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-5 font-semibold text-gray-800">
                    {order._id}
                  </td>

                  <td className="p-5">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {order.userId.name}
                      </h3>

                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>

                  <td className="p-5 text-gray-700">{order.productId.name}</td>

                  <td className="p-5 font-semibold text-gray-800">
                    ₹{order.amount}
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="p-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="p-5 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-5">
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition">
                        View
                      </button>

                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition">
                        Update
                      </button>

                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-gray-500 text-sm">Showing 1 to 10 of 547 orders</p>

        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-xl bg-white hover:bg-gray-100 transition">
            Previous
          </button>

          <button className="border px-4 py-2 rounded-xl bg-black text-white">
            1
          </button>

          <button className="border px-4 py-2 rounded-xl bg-white hover:bg-gray-100 transition">
            2
          </button>

          <button className="border px-4 py-2 rounded-xl bg-white hover:bg-gray-100 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
