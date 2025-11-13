import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

export default function useTasks(userId) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "tasks"), where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setTasks(list);
    });

    return () => unsubscribe();
  }, [userId]);

  const addTask = async (task) => {
    await addDoc(collection(db, "tasks"), {
      ...task,
      userId,
      status: "todo",
      completed: false
    });
  };

  const updateTask = async (id, updatedData) => {
    await updateDoc(doc(db, "tasks", id), updatedData);
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return { tasks, addTask, updateTask, deleteTask };
}
