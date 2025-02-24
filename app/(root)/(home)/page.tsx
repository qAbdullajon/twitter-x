import Form from "@/components/shared/form"
import Header from "@/components/shared/header"
import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"

const Home = async () => {
  const session: any = await getServerSession(authOptions)

  return (
    <>
      <Header label="Home" isBack />
      <Form placeholder="What's happening?" user={JSON.parse(JSON.stringify(session?.currentUser))} />
    </>
  )
}

export default Home