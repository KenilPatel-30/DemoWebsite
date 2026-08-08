"use client";

import { Search, Mail, Phone, Calendar, UserCircle } from "lucide-react";

export default function CustomersPage() {
  const dummyCustomers = [
    { id: "CUST-001", name: "Rahul Mehta", email: "rahul.m@example.com", phone: "+91 98765 43210", orders: 12, spent: "₹8,450", lastVisit: "Today" },
    { id: "CUST-002", name: "Sneha Patel", email: "sneha.p@example.com", phone: "+91 87654 32109", orders: 8, spent: "₹4,200", lastVisit: "Yesterday" },
    { id: "CUST-003", name: "Vikram Singh", email: "vikram.s@example.com", phone: "+91 76543 21098", orders: 24, spent: "₹15,250", lastVisit: "2 days ago" },
    { id: "CUST-004", name: "Anjali Desai", email: "anjali.d@example.com", phone: "+91 65432 10987", orders: 3, spent: "₹1,850", lastVisit: "Last week" },
    { id: "CUST-005", name: "Karan Shah", email: "karan.s@example.com", phone: "+91 54321 09876", orders: 15, spent: "₹10,120", lastVisit: "2 weeks ago" },
  ];

  return (
    <div className="space-y-8 text-ink">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-medium tracking-tight">Customers</h2>
          <p className="text-ink/50 mt-1">Manage and view your customer directory (Dummy Data).</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="pl-10 pr-4 py-2 bg-sand border border-line rounded-lg text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:border-primary/50 w-64"
            />
          </div>
        </div>
      </div>

      <div className="bg-sand border border-line rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line text-ink/50 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Contact</th>
              <th className="p-4 font-medium">Total Orders</th>
              <th className="p-4 font-medium">Total Spent</th>
              <th className="p-4 font-medium">Last Visit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {dummyCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-ink/5 transition-colors text-ink">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{customer.name}</div>
                      <div className="text-xs text-ink/50">{customer.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-ink/70 space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-ink/40" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-ink/40" />
                    {customer.phone}
                  </div>
                </td>
                <td className="p-4 text-sm font-medium">{customer.orders}</td>
                <td className="p-4 text-sm font-medium text-primary">{customer.spent}</td>
                <td className="p-4 text-sm text-ink/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-ink/40" />
                    {customer.lastVisit}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
