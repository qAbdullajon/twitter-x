import { Icon, LucideIcon } from "lucide-react"

interface Props {
  label: string
  icon: LucideIcon
}

const SidebarItem = ({ label, icon: Icon }: Props) => {
  return (
    <div className="flex flex-row items-center">
      {/* MOBILE SIDEBAR ITEM */}
      <div className="relative rounded-full h-14 w-14 flex items-center cursor-pointer justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
        <Icon size={28} color="white" />
      </div>

      {/* DESCTOP SIDEBAR ITEM */}
      <div className="relative hidden lg:flex items-center cursor-pointer gap-4 p-4 hover:bg-slate-300 hover:bg-opacity-10">
        <Icon size={28} color="white" />
        <p className="hidden lg:block text-xl text-white">{label}</p>
      </div>
    </div>
  )
}

export default SidebarItem