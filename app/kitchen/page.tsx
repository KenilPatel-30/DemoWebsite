"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/services/orderService";
import { Order, OrderStatus } from "@/types/restaurant";
import { Clock, Loader2, Check } from "lucide-react";

const COLUMNS: { id: OrderStatus; label: string; color: string }[] = [
  { id: "Pending", label: "New Orders", color: "border-orange-500/50" },
  { id: "Accepted", label: "Accepted", color: "border-blue-500/50" },
  { id: "Preparing", label: "Preparing", color: "border-primary/50" },
  { id: "Ready", label: "Ready", color: "border-green-500/50" },
];

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = orderService.listenToActiveOrders((liveOrders) => {
      setOrders(liveOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (orderId: string, currentStatus: OrderStatus) => {
    const currentIndex = COLUMNS.findIndex(c => c.id === currentStatus);
    // If it's "Ready", the next logical step for the kitchen is "Delivered" (to clear it from the board)
    const nextStatus: OrderStatus = currentIndex < COLUMNS.length - 1 ? COLUMNS[currentIndex + 1].id : "Delivered";
    
    try {
      await orderService.updateOrderStatus(orderId, nextStatus);
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Error updating order status.");
    }
  };

  if (loading) {
    return (
      <div className="flex w-full h-full items-center justify-center text-ink/50 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="text-xl">Connecting to Kitchen...</span>
      </div>
    );
  }

  return (
    <div className="flex gap-6 h-full w-full">
      {COLUMNS.map(col => {
        const columnOrders = orders.filter(o => o.status === col.id);
        
        return (
          <div key={col.id} className="flex flex-col w-[350px] flex-shrink-0 bg-paper rounded-2xl border border-line overflow-hidden">
            <div className={`p-4 border-b-2 ${col.color} bg-sand flex justify-between items-center`}>
              <h2 className="font-bold text-lg text-ink">{col.label}</h2>
              <span className="bg-ink/10 text-ink px-3 py-1 rounded-full text-sm font-medium">{columnOrders.length}</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {columnOrders.length === 0 ? (
                <div className="text-center text-ink/30 pt-10 text-sm">No orders in this queue</div>
              ) : (
                columnOrders.map(order => (
                  <div key={order.id} className="bg-sand rounded-xl p-4 shadow-lg border border-line hover:border-ink/20 transition-colors">
                    <div className="flex justify-between items-start mb-3 border-b border-line pb-3">
                      <div>
                        <div className="font-bold text-xl text-primary">{order.orderId}</div>
                        <div className="text-xs text-ink/50 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {/* Formatting Firestore timestamp roughly */}
                          {order.createdAt ? new Date(order.createdAt.seconds * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm text-ink/80">{order.customerName}</div>
                        <div className="text-xs text-ink/40 mb-1">{order.items.length} items</div>
                        {order.paymentMethod && (
                          <div className={`text-[10px] inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${
                            order.paymentStatus === 'Paid' ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
                          }`}>
                            {order.paymentMethod} {order.paymentStatus === 'Paid' ? '✓' : '(Unpaid)'}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-4 text-ink">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          <div className="flex items-start gap-2">
                            <span className="font-bold bg-ink/10 px-2 rounded">{item.quantity}x</span>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          {item.selections?.addons && item.selections.addons.length > 0 && (
                            <ul className="ml-8 mt-1 space-y-1">
                              {item.selections.addons.map((addon, i) => (
                                <li key={i} className="text-xs text-primary/80 flex items-center gap-1">
                                  <span className="text-primary/40">+</span> {addon}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                    
                    {order.notes && (
                      <div className="bg-orange-500/10 border border-orange-500/20 text-orange-200 text-xs p-3 rounded-lg mb-4 italic">
                        "{order.notes}"
                      </div>
                    )}
                    
                    <button 
                      onClick={() => handleUpdateStatus(order.id!, order.status)}
                      className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                      col.id === "Pending" ? "bg-orange-600 hover:bg-orange-500 text-white" :
                        col.id === "Accepted" ? "bg-blue-600 hover:bg-blue-500 text-white" :
                        col.id === "Preparing" ? "bg-primary hover:bg-primary/80 text-paper" :
                        "bg-green-600 hover:bg-green-500 text-white"
                      }`}
                    >
                      {col.id === "Pending" ? "Accept Order" :
                       col.id === "Accepted" ? "Start Preparing" :
                       col.id === "Preparing" ? "Mark Ready" :
                       "Mark Delivered"}
                       {col.id === "Ready" && <Check className="w-5 h-5" />}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
