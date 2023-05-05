import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) return;

  return (
    <Layout>
      <div className="flex justify-between">
        <h1>Hello, {session?.user?.name}!</h1>
        <div className="flex bg-gray-500 gap-1 rounded-lg overflow-hidden text-white">
          <img src={session.user.image} alt="user image" className="w-6 h-6" />
          <span className="px-2">{session.user.name}</span>
        </div>
      </div>
    </Layout>
  )
}
