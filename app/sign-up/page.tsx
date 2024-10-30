import SignUpForm from "@/components/signup-form";

export default async function page() {
  return (
    <div className={"h-screen w-full flex justify-center items-center"}>
      <SignUpForm />
    </div>
  );
}
