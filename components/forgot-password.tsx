import { Input } from "@/components/ui/input";
import { sendForgotPassword } from "@/lib/action";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  return (
    <form
      action={sendForgotPassword}
      className={"flex justify-center items-center flex-col gap-2"}
    >
      <Input type={"email"} placeholder={"Enter Email"} name={"email"} />
      <Button type="submit" className={"mt-2"}>
        Send
      </Button>
    </form>
  );
}
