import { redirect } from "next/navigation";

export default function Home() {
  // This will never be rendered because middleware will handle the redirect
  redirect("/admin/users");
}
