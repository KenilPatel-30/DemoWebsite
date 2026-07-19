"use client";

import { useOrder } from "@/context/OrderContext";
import OrderHome from "@/components/order/OrderHome";
import OrderMenu from "@/components/order/OrderMenu";
import Cart from "@/components/order/Cart";
import Checkout from "@/components/order/Checkout";
import OrderConfirmation from "@/components/order/OrderConfirmation";
import BookTable from "@/components/order/BookTable";
import BookingConfirmation from "@/components/order/BookingConfirmation";
import OrderHistory from "@/components/order/OrderHistory";
import ItemDetailsModal from "@/components/order/ItemDetailsModal";
import FloatingCartButton from "@/components/order/FloatingCartButton";
import { AnimatePresence } from "framer-motion";

export default function OrderPage() {
  const { currentView, activeItem } = useOrder();

  return (
    <main className="relative min-h-screen pb-24">
      {currentView === "home" && <OrderHome />}
      {currentView === "menu" && <OrderMenu />}
      {currentView === "cart" && <Cart />}
      {currentView === "checkout" && <Checkout />}
      {currentView === "orderConfirmed" && <OrderConfirmation />}
      {currentView === "orders" && <OrderHistory />}
      {currentView === "bookTable" && <BookTable />}
      {currentView === "bookingConfirmed" && <BookingConfirmation />}

      {/* Persistent Components over certain views */}
      <AnimatePresence>
        {(currentView === "home" || currentView === "menu") && <FloatingCartButton />}
        {activeItem && <ItemDetailsModal />}
      </AnimatePresence>
    </main>
  );
}
