import { redirect } from "next/navigation";

export default function AdminPage() {
  // For now, redirect straight to Menu Management as it's the primary feature we're building
  redirect("/admin/menu");
}
