import React from 'react'
import { cn } from '@/lib/utils'

const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'default',
  children,
  disabled,
  loading,
  ...props
}, ref) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    destructive: 'btn-destructive',
  }

  const sizes = {
    sm: 'h-9 px-3 text-xs',
    default: 'h-11 px-5 py-2.5',
    lg: 'h-12 px-7 text-base',
    icon: 'h-11 w-11 px-0',
  }

  return (
    <button
      className={cn(
        'btn',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        loading && 'relative text-transparent',
        className
      )}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:120ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current [animation-delay:240ms]" />
        </div>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }
