import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ButtonProps {
  label: ReactNode | string
  disabled?: boolean
  secondary?: boolean
  fullwidth?: boolean
  large?: boolean
  outline?: boolean
  type?: "button" | "submit"
  onClick?: () => void,
  className?: string
}

export default function Button({
  label,
  disabled,
  fullwidth,
  large,
  onClick,
  outline,
  secondary,
  type,
  className
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={cn(
        "rounded-full font-semibold border transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed",
        fullwidth ? "w-full" : "w-fit",
        secondary ? "bg-white text-black" : "bg-sky-500 text-white",
        large ? "text-xl px-5 py-3" : "text-md px-4 py-3",
        outline ? "bg-transparent border-slate-600 text-sky-500 hover:bg-slate-800/40" : "",
        className
      )}
    >{label}</button>
  )
}
