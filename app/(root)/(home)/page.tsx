import Auth from "@/components/auth"

const Home = () => {
  const auth = false

  if (!auth) return <div className="p-[1rem] h-screen mx-auto max-w-7xl"><Auth /></div>
  return (
    <div>Home</div>
  )
}

export default Home