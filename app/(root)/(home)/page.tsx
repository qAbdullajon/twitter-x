import Auth from "@/components/auth/page"

const Home = () => {
  const auth = false

  if (!auth) return <Auth />
  return (
    <div>Home</div>
  )
}

export default Home