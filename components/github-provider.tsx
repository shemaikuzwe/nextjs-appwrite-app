import { signInWithGithub } from "@/lib/action";
import { Github } from "lucide-react";
export default function GithubProvider() {
  const handleClick = async () => {
    try {
      await signInWithGithub();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center gap-2 justify-center bg-white rounded-md cursor-pointer  py-2 text-black" onClick={handleClick}>
      <Github />
      Continue With Github
    </div>
  );
}
