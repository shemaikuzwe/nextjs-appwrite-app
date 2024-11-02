import { Input } from "@/components/ui/input";
import { sendEmail } from "@/lib/action";
import { Button } from "@/components/ui/button";

export default function Email() {
  return (
    <form action={sendEmail}>
      <Input type={"email"} placeholder={"Enter Email"} name={"email"} />
      <Button type="submit" className={"mt-2"}>
        Send
      </Button>
    </form>
  );
}
