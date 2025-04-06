import React, { useState } from 'react'

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ children, className = '' }) => {
  return (
    <div className={`accordion ${className}`}>
      {children}
    </div>
  )
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ children, value, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`accordion-item ${className}`}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        
        // Safely handle AccordionTrigger
        if (child.type === AccordionTrigger) {
          return React.cloneElement(child as React.ReactElement<AccordionTriggerProps>, {
            onClick: () => setIsOpen(!isOpen)
          });
        }
        
        // Safely handle AccordionContent
        if (child.type === AccordionContent) {
          return isOpen ? child : null;
        }
        
        return child;
      })}
    </div>
  )
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, onClick, className = '' }) => {
  return (
    <div 
      className={`accordion-trigger cursor-pointer flex justify-between items-center ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ children, className = '' }) => {
  return (
    <div className={`accordion-content ${className}`}>
      {children}
    </div>
  )
}
