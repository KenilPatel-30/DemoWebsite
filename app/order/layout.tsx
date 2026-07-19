import { OrderProvider } from "@/context/OrderContext";
import BottomNav from "@/components/order/BottomNav";

export const metadata = {
  title: "Order Now · Demo Cafe",
  description: "Order ahead or book a table directly from your phone.",
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-[#FCF6F0] font-sans text-ink selection:bg-primary/20 antialiased overflow-x-hidden">
      <OrderProvider>
        {children}
        <BottomNav />
      </OrderProvider>
    </div>
  );
}
