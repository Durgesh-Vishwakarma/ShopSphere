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
    sm: 'h-8 px-3 text-xs',
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-8',
    icon: 'h-10 w-10',
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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }