import Nav from "@/components/Nav"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  if (!session) return (
    <div className={"bg-black w-screen h-screen"}>
      <div className={"text-center w-full"}>
        <button onClick={() => signIn('google')} className={"bg-white p-2 px-4 rounded-lg"} >Login with Google</button>
      </div>
    </div>
  )

  return (
    <div className={"bg-zinc-800 flex min-h-screen"}>
      <Nav />
      <div className={" bg-white flex-grow m-2 rounded-lg p-4"}>Welcome {session.user.name}</div>
    </div>
  )

}
