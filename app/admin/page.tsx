"use client";

import { TrendingUp, Users, Receipt, Coffee, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Revenue", value: "₹45,231", trend: "+12.5%", icon: TrendingUp },
    { title: "Total Orders", value: "156", trend: "+8.2%", icon: Receipt },
    { title: "Active Customers", value: "84", trend: "+2.4%", icon: Users },
    { title: "Items Sold", value: "412", trend: "+15.3%", icon: Coffee },
  ];

  const recentOrders = [
    { id: "ORD-1024", customer: "Rahul Mehta", items: 3, total: "₹850", status: "Delivered", time: "10 mins ago" },
    { id: "ORD-1025", customer: "Sneha Patel", items: 2, total: "₹420", status: "Preparing", time: "5 mins ago" },
    { id: "ORD-1026", customer: "Vikram Singh", items: 5, total: "₹1,250", status: "Pending", time: "Just now" },
  ];

  return (
    <div className="space-y-8 text-ink">
      <div>
        <h2 className="text-3xl font-medium tracking-tight">Dashboard Overview</h2>
        <p className="text-ink/50 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-sand border border-line rounded-xl p-6 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-green-500 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-ink/50 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="col-span-2 bg-sand border border-line rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Recent Orders (Dummy Data)</h3>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-paper rounded-lg border border-line">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{order.customer}</h4>
                    <p className="text-xs text-ink/50">{order.id} • {order.items} items</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm mb-1">{order.total}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    order.status === "Delivered" ? "bg-green-500/10 text-green-400" :
                    order.status === "Pending" ? "bg-orange-500/10 text-orange-400" :
                    "bg-blue-500/10 text-blue-400"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Items */}
        <div className="col-span-1 bg-sand border border-line rounded-xl p-6">
          <h3 className="font-bold text-lg mb-6">Top Selling Items</h3>
          <div className="space-y-4">
            {[
              { name: "Iced Caramel Macchiato", sales: 124 },
              { name: "Avocado Toast", sales: 98 },
              { name: "Classic Cappuccino", sales: 85 },
              { name: "Truffle Fries", sales: 64 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-ink/30 font-bold text-sm">0{i+1}</span>
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
                <span className="text-xs text-ink/50 bg-paper px-2 py-1 rounded-md">{item.sales} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
