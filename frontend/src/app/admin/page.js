export default function AdminDashboard() {
  const cards = [
    {
      title: "Products",
      total: "120",
      desc: "Manage all products",
      link: "/admin/products",
      icon: "🛍️",
    },
    {
      title: "Users",
      total: "520",
      desc: "Manage users & access",
      link: "/admin/users",
      icon: "👥",
    },
    {
      title: "Blogs",
      total: "34",
      desc: "Create & update blogs",
      link: "/admin/blogs",
      icon: "📝",
    },
    {
      title: "Orders",
      total: "89",
      desc: "Track customer orders",
      link: "/admin/orders",
      icon: "📦",
    },
    {
      title: "Coupons",
      total: "12",
      desc: "Manage discount coupons",
      link: "/admin/coupons",
      icon: "🎟️",
    },
    {
      title: "Analytics",
      total: "Live",
      desc: "View sales analytics",
      link: "/admin/analytics",
      icon: "📊",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-white shadow-sm border-b px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your store from one place
          </p>
        </div>

        <button className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition">
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h2 className="text-gray-500 text-sm">Total Sales</h2>
          <p className="text-3xl font-bold mt-2">₹1,20,000</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">89</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-3xl font-bold mt-2">520</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h2 className="text-gray-500 text-sm">Today's Users</h2>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
      </div>

      {/* Management Cards */}
      <div className="px-8 pb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Management Panels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-lg transition duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-5xl">{card.icon}</div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">Total</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {card.total}
                  </h3>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 group-hover:text-black">
                {card.title}
              </h2>

              <p className="text-gray-500 mt-2 text-sm">
                {card.desc}
              </p>

              <div className="mt-5 inline-flex items-center text-sm font-semibold text-black">
                Manage →
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
