"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, Receipt, Coffee, ArrowUpRight, Loader2 } from "lucide-react";
import { orderService } from "@/services/orderService";
import { Order } from "@/types/restaurant";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrderHistory();
        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders for dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-ink/50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-lg font-medium">Loading Dashboard Data...</span>
      </div>
    );
  }

  // Calculate metrics
  const validOrders = orders.filter(o => o.status !== "Cancelled");
  
  const totalRevenue = validOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrdersCount = validOrders.length;
  
  const uniqueCustomers = new Set(validOrders.map(o => o.customerName)).size;
  
  const itemsSold = validOrders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
  }, 0);

  const stats = [
    { title: "Total Revenue", value: `₹${totalRevenue.toFixed(0)}`, trend: "+12.5%", icon: TrendingUp },
    { title: "Total Orders", value: totalOrdersCount.toString(), trend: "+8.2%", icon: Receipt },
    { title: "Active Customers", value: uniqueCustomers.toString(), trend: "+2.4%", icon: Users },
    { title: "Items Sold", value: itemsSold.toString(), trend: "+15.3%", icon: Coffee },
  ];

  const recentOrders = validOrders.slice(0, 4); // Top 4 recent

  // Calculate top selling items
  const itemSales: Record<string, number> = {};
  validOrders.forEach(order => {
    order.items.forEach(item => {
      itemSales[item.name] = (itemSales[item.name] || 0) + item.quantity;
    });
  });
  const topSellingItems = Object.entries(itemSales)
    .map(([name, sales]) => ({ name, sales }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5); // Top 5

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
                <div className="flex items-center gap-1 text-green-500 text-xs font-medium bg-green-500/10 px-2 py-1 rounded-full opacity-50">
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
            <h3 className="font-bold text-lg">Recent Orders</h3>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentOrders.length === 0 ? (
              <div className="text-ink/50 py-4 text-center">No recent orders found.</div>
            ) : (
              recentOrders.map((order, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-paper rounded-lg border border-line">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs uppercase">
                      {order.customerName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{order.customerName}</h4>
                      <p className="text-xs text-ink/50">
                        {order.orderId} • {order.items.length} items • Table: {order.tableNumber || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm mb-1">₹{order.total.toFixed(0)}</div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      order.status === "Delivered" ? "bg-green-500/10 text-green-400" :
                      order.status === "Pending" ? "bg-orange-500/10 text-orange-400" :
                      "bg-blue-500/10 text-blue-400"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Popular Items */}
        <div className="col-span-1 bg-sand border border-line rounded-xl p-6">
          <h3 className="font-bold text-lg mb-6">Top Selling Items</h3>
          <div className="space-y-4">
            {topSellingItems.length === 0 ? (
              <div className="text-ink/50 py-4 text-center">No sales data yet.</div>
            ) : (
              topSellingItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-ink/30 font-bold text-sm">0{i+1}</span>
                    <span className="font-medium text-sm truncate max-w-[150px]">{item.name}</span>
                  </div>
                  <span className="text-xs text-ink/50 bg-paper px-2 py-1 rounded-md whitespace-nowrap">{item.sales} sold</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
