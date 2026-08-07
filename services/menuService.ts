import { db } from "@/firebase/config";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { MenuItem } from "@/types/restaurant";

const COLLECTION_NAME = "menu";

export const menuService = {
  /**
   * Fetch all menu items from Firestore
   */
  async getAllItems(): Promise<MenuItem[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), where("isArchived", "!=", true));
      const querySnapshot = await getDocs(q);
      const items: MenuItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MenuItem);
      });
      return items;
    } catch (error) {
      console.error("Error fetching menu items:", error);
      throw error;
    }
  },

  /**
   * Fetch a single menu item by ID
   */
  async getItemById(id: string): Promise<MenuItem | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as MenuItem;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching menu item ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new menu item
   */
  async createItem(item: Omit<MenuItem, "id">): Promise<string> {
    try {
      const newDocRef = doc(collection(db, COLLECTION_NAME));
      await setDoc(newDocRef, { ...item, isArchived: false });
      return newDocRef.id;
    } catch (error) {
      console.error("Error creating menu item:", error);
      throw error;
    }
  },

  /**
   * Update an existing menu item
   */
  async updateItem(id: string, updates: Partial<MenuItem>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error(`Error updating menu item ${id}:`, error);
      throw error;
    }
  },

  /**
   * Soft delete a menu item
   */
  async deleteItem(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { isArchived: true, availability: false });
    } catch (error) {
      console.error(`Error deleting menu item ${id}:`, error);
      throw error;
    }
  },
};
