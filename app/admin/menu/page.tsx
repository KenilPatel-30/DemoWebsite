"use client";

import { useEffect, useState } from "react";
import { menuService } from "@/services/menuService";
import { MenuItem } from "@/types/restaurant";
import { ORDER_MENU } from "@/lib/orderData";
import { Plus, Database, Trash2, Edit2 } from "lucide-react";

export default function MenuManagementPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await menuService.getAllItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to load menu", error);
    } finally {
      setLoading(false);
    }
  };

  const seedDatabase = async () => {
    if (!confirm("This will add all hardcoded items from orderData.ts to Firestore. Proceed?")) return;
    setSeeding(true);
    try {
      for (const item of ORDER_MENU) {
        // Strip the string 'id' from orderData as Firestore generates its own ID
        const { id, ...rest } = item;
        await menuService.createItem({
          ...rest,
          availability: true, // Default to available
          isVeg: item.tags?.includes("Vegan") || item.tags?.includes("Dairy-Free") ? true : false, // Rough approximation
        });
      }
      alert("Database seeded successfully!");
      fetchItems();
    } catch (error) {
      console.error("Error seeding database", error);
      alert("Failed to seed database. Check console.");
    } finally {
      setSeeding(false);
    }
  };

  const toggleAvailability = async (id: string, current: boolean) => {
    try {
      await menuService.updateItem(id, { availability: !current });
      setItems(items.map(i => i.id === id ? { ...i, availability: !current } : i));
    } catch (error) {
      console.error("Failed to update availability", error);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await menuService.deleteItem(id);
      setItems(items.filter(i => i.id !== id));
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-ink/50 animate-pulse">Loading menu items...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-medium tracking-tight text-ink">Menu Management</h2>
          <p className="text-ink/50 mt-1">Manage your restaurant's food and beverage offerings.</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={seedDatabase}
            disabled={seeding}
            className="flex items-center gap-2 px-4 py-2 bg-ink/10 hover:bg-ink/20 text-ink rounded-lg transition-colors disabled:opacity-50"
          >
            <Database className="w-4 h-4" />
            {seeding ? "Seeding..." : "Seed from Hardcoded Data"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-paper rounded-lg transition-colors shadow-card">
            <Plus className="w-4 h-4" />
            Add New Item
          </button>
        </div>
      </div>

      <div className="bg-sand border border-line rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line text-ink/50 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">Item</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium text-center">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-ink/50">
                  No menu items found. Click "Seed from Hardcoded Data" to import them.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-ink/5 transition-colors text-ink">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/50 relative border border-line">
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-ink/40 line-clamp-1 max-w-[200px]">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-ink/70">{item.category}</td>
                  <td className="p-4 text-sm font-medium">₹{item.price}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggleAvailability(item.id!, item.availability)}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.availability ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.availability ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-ink/40 hover:text-ink transition-colors rounded-lg hover:bg-ink/10">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteItem(item.id!)}
                        className="p-2 text-ink/40 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
