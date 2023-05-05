import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  if (!session) return (
    <div className={"bg-black w-screen h-screen flex items-center"}>
      <div className={"text-center w-full"}>
        <button onClick={() => signIn('google')} className={"bg-white p-2 px-4 rounded-lg"} >Login with Google</button>
      </div>
    </div>
  )

  return (
    <div className={"bg-black w-screen h-screen flex items-center"}>
      <div className={"text-center w-full"}>
        <h1 className={"text-white text-2xl"}>Welcome {session.user.name}</h1>
        <button className={"bg-white p-2 px-4 rounded-lg"} onClick={() => signOut()}>Logout</button>
      </div>
    </div>
  )

}
