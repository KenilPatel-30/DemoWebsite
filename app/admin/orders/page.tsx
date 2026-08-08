"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/services/orderService";
import { Order } from "@/types/restaurant";
import { Clock, Search, Receipt, Calendar, TrendingUp, Filter } from "lucide-react";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("all"); // 'all', 'today', 'yesterday'
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getOrderHistory();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredOrders = () => {
    let filtered = orders;
    
    // Date filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateFilter === "today") {
      filtered = filtered.filter(o => o.createdAt && new Date(o.createdAt.seconds * 1000) >= today);
    } else if (dateFilter === "yesterday") {
      filtered = filtered.filter(o => {
        if (!o.createdAt) return false;
        const d = new Date(o.createdAt.seconds * 1000);
        return d >= yesterday && d < today;
      });
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(o => 
        o.orderId?.toLowerCase().includes(q) || 
        o.customerName?.toLowerCase().includes(q) ||
        o.tableNumber?.toLowerCase().includes(q)
      );
    }

    return filtered;
  };

  const displayedOrders = getFilteredOrders();
  
  // Metrics calculation
  const validOrders = displayedOrders.filter(o => o.status !== "Cancelled");
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = validOrders.length;
  const aov = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;

  if (loading) {
    return <div className="p-8 text-ink/50 animate-pulse">Loading order history...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-medium tracking-tight text-ink">Order History</h2>
          <p className="text-ink/50 mt-1">View all past and current orders, filter by date.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input 
              type="text" 
              placeholder="Search by ID, name, table..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-sand border border-line rounded-lg text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-primary/50 w-64"
            />
          </div>
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 bg-sand border border-line rounded-lg text-sm text-ink focus:outline-none focus:border-primary/50 cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
          </select>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-sand border border-line rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">₹{totalRevenue.toFixed(0)}</h3>
          <p className="text-ink/50 text-sm">Total Revenue</p>
        </div>
        
        <div className="bg-sand border border-line rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">{totalOrdersCount}</h3>
          <p className="text-ink/50 text-sm">Total Orders</p>
        </div>

        <div className="bg-sand border border-line rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <Filter className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-1">₹{aov.toFixed(0)}</h3>
          <p className="text-ink/50 text-sm">Average Order Value</p>
        </div>
      </div>

      <div className="bg-sand border border-line rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line text-ink/50 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Date & Time</th>
              <th className="p-4 font-medium">Table</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium text-center">Payment</th>
              <th className="p-4 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {displayedOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-ink/50">
                  No orders found.
                </td>
              </tr>
            ) : (
              displayedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-ink/5 transition-colors text-ink">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-ink/40" />
                      <span className="font-bold text-primary">{order.orderId}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-ink/70">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-ink/40" />
                      {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleString([], {
                        month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
                      }) : 'Pending...'}
                    </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-ink">
                    {order.tableNumber || "-"}
                  </td>
                  <td className="p-4 text-sm font-medium">{order.customerName}</td>
                  <td className="p-4 text-sm font-medium">₹{order.total.toFixed(0)}</td>
                  <td className="p-4 text-center">
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      order.paymentStatus === 'Paid' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
                    }`}>
                      {order.paymentMethod || 'Unknown'} {order.paymentStatus === 'Paid' ? '✓' : '(Unpaid)'}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === "Delivered" ? "bg-green-500/20 text-green-400" :
                      order.status === "Pending" ? "bg-orange-500/20 text-orange-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
