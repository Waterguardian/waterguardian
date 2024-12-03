'use client'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Separator } from '@radix-ui/react-separator'
import { ReactNode, useEffect, useState } from 'react'
import { cn } from '../../util/cn'

interface SidebarProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export const Sidebar = ({ open, onClose, children }: SidebarProps) => {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (open) {
      setIsClosing(false)
    }
  }, [open])

  const handleClose = () => {
    setIsClosing(true)
    // Wait for animation to complete before calling onClose
    setTimeout(onClose, 300) // 300ms matches the animation duration
  }

  if (!open && !isClosing) return null

  return (
    <div
      className={cn(
        'fixed top-[calc(var(--header-height)+1rem)] right-4',
        'h-[70vh] w-80 bg-[--gray-1] border-l border-[--gray-6]',
        'shadow-lg p-4',
        'rounded-xl overflow-hidden',
        isClosing ? 'animate-slideOut' : 'animate-slideIn',
      )}
    >
      <h2 className="text-lg font-bold text-[--gray-12]">Aktuelle Daten</h2>

      <Separator className="my-6 bg-[--gray-6] h-px w-full" />

      <button
        onClick={handleClose}
        className={cn(
          'absolute top-2 right-2',
          'h-6 w-6 rounded-full',
          'flex items-center justify-center',
          'text-[--gray-11] hover:text-[--gray-12]',
          'hover:bg-[--gray-3]',
          'transition-colors duration-300',
        )}
        aria-label="Close"
      >
        <Cross2Icon />
      </button>

      <div className="text-[--gray-12]">{children}</div>
    </div>
  )
}
