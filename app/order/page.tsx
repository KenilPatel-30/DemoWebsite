"use client";

import { useOrder } from "@/context/OrderContext";
import OrderMenu from "@/components/order/OrderMenu";
import Cart from "@/components/order/Cart";
import OrderHistory from "@/components/order/OrderHistory";
import Checkout from "@/components/order/Checkout";
import OrderConfirmation from "@/components/order/OrderConfirmation";
import BookTable from "@/components/order/BookTable";
import BookingConfirmation from "@/components/order/BookingConfirmation";
import ItemDetailsModal from "@/components/order/ItemDetailsModal";
import { AnimatePresence } from "framer-motion";

export default function OrderPage() {
  const { currentView, activeItem } = useOrder();

  return (
    <main className="relative min-h-screen pb-24">
      {currentView === "menu" && <OrderMenu />}
      {currentView === "cart" && <Cart />}
      {currentView === "orders" && <OrderHistory />}
      {currentView === "checkout" && <Checkout />}
      {currentView === "orderConfirmed" && <OrderConfirmation />}
      {currentView === "bookTable" && <BookTable />}
      {currentView === "bookingConfirmed" && <BookingConfirmation />}

      {/* Persistent Components over certain views */}
      <AnimatePresence>
        {activeItem && <ItemDetailsModal />}
      </AnimatePresence>
    </main>
  );
}
