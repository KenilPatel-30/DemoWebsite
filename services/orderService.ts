import { db } from "@/firebase/config";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { Order, OrderStatus } from "@/types/restaurant";

const COLLECTION_NAME = "orders";

export const orderService = {
  /**
   * Create a new order in Firestore
   */
  async createOrder(orderData: Omit<Order, "id" | "orderId" | "createdAt" | "updatedAt">): Promise<string> {
    try {
      const newDocRef = doc(collection(db, COLLECTION_NAME));
      // Generate a simple order ID like ORD-1234
      const uniqueId = Math.floor(1000 + Math.random() * 9000);
      const orderId = `ORD-${uniqueId}`;

      const newOrder = {
        ...orderData,
        orderId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(newDocRef, newOrder);
      return newDocRef.id;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  /**
   * Update an order's status
   */
  async updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error(`Error updating order status for ${id}:`, error);
      throw error;
    }
  },

  /**
   * Listen to all active orders for the Kitchen Display System (KDS)
   * Excludes "Delivered" orders
   */
  listenToActiveOrders(callback: (orders: Order[]) => void): () => void {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const orders: Order[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Order;
        if (data.status !== "Delivered") {
          orders.push({ id: doc.id, ...data });
        }
      });
      callback(orders);
    }, (error) => {
      console.error("Error listening to active orders:", error);
    });

    return unsubscribe; // Return the unsubscribe function
  },

  /**
   * Listen to a specific order for customer tracking
   */
  listenToOrder(id: string, callback: (order: Order | null) => void): () => void {
    const docRef = doc(db, COLLECTION_NAME, id);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: docSnap.id, ...docSnap.data() } as Order);
      } else {
        callback(null);
      }
    }, (error) => {
      console.error(`Error listening to order ${id}:`, error);
    });

    return unsubscribe;
  },
  
  /**
   * Fetch order history (e.g. for admin)
   */
  async getOrderHistory(): Promise<Order[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const orders: Order[] = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() } as Order);
      });
      return orders;
    } catch (error) {
      console.error("Error fetching order history:", error);
      throw error;
    }
  }
};
