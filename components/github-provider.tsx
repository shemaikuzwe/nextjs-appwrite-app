import { Button } from "@/components/ui/button";
import { signInWithGithub } from "@/lib/action";
import {
  Account,
  AppwriteException,
  Client,
  ID,
  OAuthProvider,
} from "appwrite";
export default function GithubProvider() {
  const handleClick = async () => {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject("67209a4e00093f6ad7c0");
    const account = new Account(client);
    try {
      await account.createOAuth2Session(
        OAuthProvider.Github,
        "http://localhost:3000/dashboard",
        "http://localhost:3000",
      );
    } catch (error) {
      console.log(error);
    }
  };
  return <Button onClick={handleClick}>Continue With Github</Button>;
}
