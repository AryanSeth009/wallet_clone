import React, { useState } from 'react'

interface AccordionProps {
  children: React.ReactNode;
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
}

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
  return (
    <div className="accordion">
      {children}
    </div>
  )
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ children, value }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="accordion-item">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          if (child.type === AccordionTrigger) {
            return React.cloneElement(child, {
              onClick: () => setIsOpen(!isOpen)
            })
          }
          if (child.type === AccordionContent) {
            return isOpen ? child : null
          }
        }
        return child
      })}
    </div>
  )
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, onClick }) => {
  return (
    <div 
      className="accordion-trigger cursor-pointer flex justify-between items-center"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface AccordionContentProps {
  children: React.ReactNode;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ children }) => {
  return (
    <div className="accordion-content">
      {children}
    </div>
  )
}
