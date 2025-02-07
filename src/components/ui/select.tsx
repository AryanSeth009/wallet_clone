import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  children?: React.ReactNode
  className?: string
}

export function Select({ 
  value, 
  onValueChange, 
  placeholder = 'Select an option', 
  children,
  className = '' 
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative w-full ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 
          bg-[#2A2A3C] text-white rounded-md 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{value || placeholder}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      {isOpen && (
        <div 
          className="absolute z-10 mt-1 w-full 
            bg-[#2A2A3C] border border-[#3A3A4C] 
            rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null
            
            return React.cloneElement(child, {
              onClick: () => {
                if (child.props.value) {
                  onValueChange?.(child.props.value)
                }
                setIsOpen(false)
              }
            })
          })}
        </div>
      )}
    </div>
  )
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  onClick?: () => void
}

export function SelectItem({ 
  value, 
  children, 
  onClick 
}: SelectItemProps) {
  return (
    <div 
      onClick={onClick}
      className="px-3 py-2 text-white 
        hover:bg-[#3A3A4C] cursor-pointer 
        transition-colors duration-200"
    >
      {children}
    </div>
  )
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <>{placeholder}</>
}
