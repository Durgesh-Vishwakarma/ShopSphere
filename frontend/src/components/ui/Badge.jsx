import React from 'react'
import { cn } from '@/lib/utils'

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'border-primary bg-primary text-primary-foreground',
    secondary: 'border-gray-200 bg-secondary text-secondary-foreground',
    destructive: 'border-red-200 bg-red-50 text-red-700',
    danger: 'border-red-200 bg-red-50 text-red-700',
    outline: 'border-input bg-background text-foreground',
    success: 'border-green-200 bg-green-50 text-green-700',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold',
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = 'Badge'

export { Badge }
