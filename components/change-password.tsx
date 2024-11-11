"use client";
import { updateRecovery } from "@/lib/action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChangePassword({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}) {
  return (
    <form
      action={(formData) => updateRecovery(formData, userId, secret)}
      className="grid gap-4"
    >
      <Input
        type={"password"}
        placeholder={"Enter new password"}
        name={"new-password"}
      />
      <Input
        type={"password"}
        placeholder={"Confirm new password"}
        name={"confirm-password"}
      />
      <Button type={"submit"}>Change Password</Button>
    </form>
  );
}
