"use client";

import { Save, Store, Bell, Shield, CreditCard } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 text-ink pb-20">
      <div>
        <h2 className="text-3xl font-medium tracking-tight">Settings</h2>
        <p className="text-ink/50 mt-1">Configure your restaurant profile and preferences (Dummy UI).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Settings Navigation Sidebar */}
        <div className="col-span-1 space-y-2">
          {[
            { id: 'general', label: 'General', icon: Store, active: true },
            { id: 'notifications', label: 'Notifications', icon: Bell, active: false },
            { id: 'security', label: 'Security', icon: Shield, active: false },
            { id: 'billing', label: 'Billing', icon: CreditCard, active: false },
          ].map(tab => (
            <button 
              key={tab.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                tab.active ? "bg-primary text-paper" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="col-span-1 md:col-span-3 space-y-6">
          
          <div className="bg-sand border border-line rounded-xl p-6">
            <h3 className="font-bold text-lg mb-6">Restaurant Profile</h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink/70">Restaurant Name</label>
                  <input type="text" defaultValue="Demo Cafe" className="w-full bg-paper border border-line rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink/70">Contact Email</label>
                  <input type="email" defaultValue="hello@democafe.com" className="w-full bg-paper border border-line rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-ink/70">Description</label>
                <textarea rows={3} defaultValue="Premium Coffee & Cuisine in Surat. An immersive web experience." className="w-full bg-paper border border-line rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink/70">Currency</label>
                  <select className="w-full bg-paper border border-line rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink/70">Timezone</label>
                  <select className="w-full bg-paper border border-line rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option>Asia/Kolkata (IST)</option>
                    <option>America/New_York (EST)</option>
                    <option>Europe/London (GMT)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sand border border-line rounded-xl p-6">
            <h3 className="font-bold text-lg mb-6">Store Hours</h3>
            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <div key={day} className="flex items-center justify-between py-2 border-b border-line last:border-0 last:pb-0">
                  <div className="flex items-center gap-4 w-1/3">
                    <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
                    <span className="text-sm font-medium">{day}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 justify-end">
                    <input type="time" defaultValue="09:00" className="bg-paper border border-line rounded px-3 py-1.5 text-sm text-ink/80 focus:outline-none focus:border-primary" />
                    <span className="text-ink/40">to</span>
                    <input type="time" defaultValue="22:00" className="bg-paper border border-line rounded px-3 py-1.5 text-sm text-ink/80 focus:outline-none focus:border-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-paper px-6 py-2.5 rounded-lg font-medium transition-colors shadow-lg">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
