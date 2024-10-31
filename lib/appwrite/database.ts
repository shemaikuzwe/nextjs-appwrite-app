import {
  DATABASE_ID,
  COLLECTION_ID,
  createAdminClient,
} from "@/lib/appwrite/appwrite.config";
import { ID } from "node-appwrite";
import { Db } from "@/lib/types";

const { database } = await createAdminClient();
const db: Record<string, Db> = {};

const collection = [
  {
    dbId: DATABASE_ID!,
    id: COLLECTION_ID!,
    name: "products",
  },
];

collection.forEach((col) => {
  db[col.name] = {
    create: async (payload, id = ID.unique()) => {
      await database.createDocument(col.dbId, col.id, id, payload);
    },
    update: async (id, payload) => {
      await database.updateDocument(col.dbId, col.id, id, payload);
    },
    delete: async (id) => {
      await database.deleteDocument(col.dbId, col.id, id);
    },
    get: async (id) => {
      return await database.getDocument(col.dbId, col.id, id);
    },
    list: async () => {
      return await database.listDocuments(col.dbId, col.id);
    },
  };
});

export { db };
