import { ReactElement } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog"
import { X } from "lucide-react"

interface MoadlProps {
  isOpen?: boolean
  onClose?: () => void
  body?: ReactElement
  footer?: ReactElement
  step?: number
  totalSteps?: number
}

export default function Modal({
  body,
  footer,
  isOpen,
  onClose,
  step,
  totalSteps
}: MoadlProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black p-1">
        <div className="flex items-center gap-4">
          <button className="p-1 hover:opacity-70 transition">
            <X onClick={onClose} size={28} />
          </button>
          {step && totalSteps && (
            <div className="text-xl font-bold">Step {step} of {totalSteps}</div>
          )}
        </div>
        <DialogHeader>
          <DialogTitle className="hidden">Title</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          <div className="pt-4">{body}</div>
          {footer && <div className="pt-4">{footer}</div>}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}