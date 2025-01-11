import { Client, ID, Storage } from "appwrite";

const client = new Client();
client.setEndpoint(import.meta.env.VITE_ENDPOINT).setProject(import.meta.env.VITE_PROJECT_ID);
const storage = new Storage(client);

export async function uploadImage(file: File) {
    const response = await storage.createFile(
        import.meta.env.VITE_BUCKET_ID,
        ID.unique(),
        file
    )
    return response;
}