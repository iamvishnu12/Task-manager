// src/hooks/useTasks.js
import { useEffect, useState, useCallback } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * useTasks(userId)
 * - returns { tasks, addTask, updateTask, deleteTask }
 * - realtime updates via onSnapshot
 */
export default function useTasks(userId) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      return;
    }

    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("userId", "==", userId));
    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Ensure consistent types/fields
      setTasks(
        list.map((t) => ({
          ...t,
          category: (t.category || "work").toLowerCase(),
          status: t.status || "todo",
          completed: !!t.completed,
        }))
      );
    });

    return () => unsub();
  }, [userId]);

  const addTask = useCallback(
    async (task) => {
      if (!userId) throw new Error("Missing userId in addTask");
      const tasksRef = collection(db, "tasks");
      const payload = {
        title: task.title || "",
        description: task.description || "",
        category: (task.category || "work").toLowerCase(),
        status: task.status || "todo",
        completed: !!task.completed || (task.status === "done"),
        dueDate: task.dueDate || "",
        createdAt: serverTimestamp(),
        userId,
      };
      await addDoc(tasksRef, payload);
    },
    [userId]
  );

  const updateTask = useCallback(async (id, updatedData) => {
    const docRef = doc(db, "tasks", id);
    // normalize certain fields
    const payload = { ...updatedData };
    if (payload.category) payload.category = payload.category.toLowerCase();
    if (payload.status) {
      payload.status = payload.status;
      payload.completed = payload.completed ?? payload.status === "done";
    }
    await updateDoc(docRef, payload);
  }, []);

  const deleteTask = useCallback(async (id) => {
    const docRef = doc(db, "tasks", id);
    await deleteDoc(docRef);
  }, []);

  return { tasks, addTask, updateTask, deleteTask };
}
