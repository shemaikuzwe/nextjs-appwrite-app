import "server-only"

export const appwriteConfig = {
    endpoint: process.env.API_ENDPOINT!,
    projectId: process.env.PROJECT_ID!,
    databaseId: process.env.DATABASE_ID!,
    collectionId: process.env.COLLECTION_ID!,
    bucketId: process.env.BUCKET_ID!,
    apiKey: process.env.API_SECRET!,
  };