import Auth from "@/components/auth"
import FollowBar from "@/components/shared/follow-bar"
import Sidebar from "@/components/sidebar/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"
import NextTopLoader from "nextjs-toploader"

interface Props {
  children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
  const session: any = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="p-[1rem] h-screen mx-auto max-w-7xl"><Auth /></div>
    )
  }
  return (
    <div className="lg:container h-screen mx-auto lg:max-w-7xl">
      <div className="flex">
        <Sidebar user={JSON.parse(JSON.stringify(session?.currentUser))} />
        <div className="flex flex-1 border-x border-neutral-800 lg:mx-4 ml-1">
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          <div className="w-full">{children}</div>
          <Toaster />
        </div>
        <FollowBar />
      </div>
    </div>
  )
}

export default Layout