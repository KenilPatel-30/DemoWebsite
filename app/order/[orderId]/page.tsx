"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { orderService } from "@/services/orderService";
import { Order, OrderStatus } from "@/types/restaurant";
import { ArrowLeft, Clock, CheckCircle2, ChefHat, Package, Check } from "lucide-react";

const STATUS_STEPS: OrderStatus[] = ["Pending", "Accepted", "Preparing", "Ready", "Delivered"];

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    
    // Subscribe to live order updates
    const unsubscribe = orderService.listenToOrder(orderId, (fetchedOrder) => {
      setOrder(fetchedOrder);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-primary animate-pulse text-lg font-medium">Tracking Order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-ink mb-2">Order Not Found</h1>
        <p className="text-ink/60 mb-6">We couldn't find an order with this ID.</p>
        <button onClick={() => router.push("/")} className="bg-primary text-white px-6 py-3 rounded-xl font-medium">
          Return to Menu
        </button>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="min-h-screen bg-paper pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-paper/90 backdrop-blur-md border-b border-ink/5">
        <div className="flex items-center gap-4 px-6 py-4 max-w-7xl mx-auto w-full">
          <button onClick={() => router.push("/")} className="p-2 -ml-2 text-ink">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-[18px] font-medium text-ink">Track Order</h1>
            <p className="text-[12px] text-ink/50">{order.orderId}</p>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-6 py-8">
        
        {/* Status Display */}
        <div className="bg-sand rounded-3xl p-8 text-center mb-8 shadow-sm border border-ink/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-ink/5">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
            />
          </div>
          
          <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-sm border border-ink/5">
            {order.status === "Pending" && <Clock className="w-8 h-8 text-orange-500 animate-pulse" />}
            {order.status === "Accepted" && <CheckCircle2 className="w-8 h-8 text-blue-500" />}
            {order.status === "Preparing" && <ChefHat className="w-8 h-8 text-primary animate-bounce" />}
            {order.status === "Ready" && <Package className="w-8 h-8 text-green-500" />}
            {order.status === "Delivered" && <Check className="w-8 h-8 text-ink" />}
          </div>
          
          <h2 className="text-2xl font-bold text-ink mb-2">
            {order.status === "Pending" && "Awaiting Confirmation"}
            {order.status === "Accepted" && "Order Accepted"}
            {order.status === "Preparing" && "Preparing Your Food"}
            {order.status === "Ready" && "Ready for Pickup"}
            {order.status === "Delivered" && "Order Complete"}
          </h2>
          <p className="text-ink/60 text-sm">
            {order.status === "Pending" && "The kitchen is reviewing your order."}
            {order.status === "Accepted" && "We've received your order and will start soon."}
            {order.status === "Preparing" && "Our chefs are crafting your items right now."}
            {order.status === "Ready" && "Grab your order from the counter!"}
            {order.status === "Delivered" && "Enjoy your meal!"}
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-ink/5">
          <h3 className="font-medium text-[16px] text-ink mb-4 border-b border-ink/5 pb-4">Order Summary</h3>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <span className="font-medium text-ink mr-2">{item.quantity}x</span>
                  <span className="text-ink/80">{item.name}</span>
                  {item.selections?.addons && item.selections.addons.length > 0 && (
                    <div className="text-[12px] text-ink/50 mt-0.5 ml-6">
                      + Addons included
                    </div>
                  )}
                </div>
                <span className="font-medium text-ink">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-ink/5 flex justify-between items-center text-lg font-bold text-ink">
            <span>Total Paid</span>
            <span>₹{order.total.toFixed(0)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
