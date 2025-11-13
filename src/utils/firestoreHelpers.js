
import { db, storage } from "../firebase";
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
  getDocs
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const addTask = async (taskData, userId) => {
  const payload = { ...taskData, userId, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
  const refDoc = await addDoc(collection(db,"tasks"), payload);
  await addDoc(collection(db,"tasks", refDoc.id, "logs"), { action:"created", by:userId, timestamp: serverTimestamp(), changes: payload });
  return refDoc.id;
};

export const updateTask = async (taskId, taskData, userId = null) => {
  await updateDoc(doc(db,"tasks",taskId), {...taskData, updatedAt: serverTimestamp()});
  if(userId) await addDoc(collection(db,"tasks",taskId,"logs"), { action:"updated", by:userId, timestamp: serverTimestamp(), changes: taskData});
};

export const deleteTask = async (taskId, userId=null) => {
  await deleteDoc(doc(db,"tasks", taskId));
  if(userId) await addDoc(collection(db,"tasks",taskId,"logs"), { action:"deleted", by:userId, timestamp: serverTimestamp() });
};

export const batchDeleteTasks = async (taskIds=[], userId=null) => {
  const promises = taskIds.map(id => deleteTask(id, userId));
  await Promise.all(promises);
};

export const subscribeToTasks = (userId, cb) => {
  const q = query(collection(db,"tasks"), where("userId","==", userId));
  return onSnapshot(q, snap => {
    const arr = snap.docs.map(d => ({ id:d.id, ...d.data()}));
    cb(arr);
  });
};

export const uploadAttachments = async (files=[], userId, taskId = "temp") => {
  if(!files || files.length===0) return [];
  const uploaded = [];
  for(const f of files){
    const path = `attachments/${userId}/${taskId}/${Date.now()}_${f.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, f);
    const url = await getDownloadURL(storageRef);
    uploaded.push({ name: f.name, url, path });
  }
  return uploaded;
};

export const getLogs = async (taskId) => {
  const snap = await getDocs(collection(db,"tasks",taskId,"logs"));
  return snap.docs.map(d => ({ id:d.id, ...d.data() }));
};
