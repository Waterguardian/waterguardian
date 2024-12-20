'use client'
import { Cross2Icon } from '@radix-ui/react-icons'
import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@radix-ui/react-scroll-area'
import { Separator } from '@radix-ui/react-separator'
import { ReactNode, useEffect, useState } from 'react'
import { cn } from '../../util/cn'

interface SidebarProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export const Sidebar = ({ open, onClose, children }: SidebarProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open])

  if (!isVisible && !open) return null

  return (
    <div
      className={cn(
        'absolute top-4 right-4 z-40',
        'h-full sm:h-fit max-h-[85%] w-80', // Responsive height and width
        'shadow-lg p-4',
        'rounded-xl overflow-hidden',
        'duration-300',
        'bg-[--gray-1]',
        open
          ? 'animate-in fade-in slide-in-from-right-[100%]'
          : 'animate-out fade-out slide-out-to-right-[100%]',
      )}
    >
      <h2 className="text-lg font-bold text-[--gray-12]">Aktuelle Daten</h2>

      <Separator className="my-4 bg-[--gray-6] h-px w-full" />

      <button
        onClick={onClose}
        className={cn(
          'absolute top-2 right-2',
          'h-8 w-8 sm:h-6 sm:w-6', // Larger button on small screens
          'rounded-full',
          'flex items-center justify-center',
          'text-[--gray-11]',
          'hover:text-[--gray-12]',
          'hover:bg-[--gray-3]',
          'transition-colors duration-300',
        )}
        aria-label="Close"
      >
        <Cross2Icon width={20} height={20} className="sm:w-4 sm:h-4" />
      </button>

      <ScrollArea className="h-[calc(100%-80px)] w-full">
        <ScrollAreaViewport className="h-full w-full">
          <div className="text-[--gray-11] pr-4">{children}</div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar
          orientation="vertical"
          className="flex select-none touch-none p-0.5 bg-[--gray-3] transition-colors duration-150 ease-out hover:bg-[--gray-4] data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        >
          <ScrollAreaThumb className="flex-1 bg-[--gray-6] rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollAreaScrollbar>
      </ScrollArea>
    </div>
  )
}
