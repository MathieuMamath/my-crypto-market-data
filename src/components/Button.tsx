import className from 'classnames';
import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode,
  primary?: boolean,
  secondary?: boolean,
  success?: boolean,
  warning?: boolean,
  danger?: boolean,
  rounded?: boolean,
  outline?: boolean,
  disabled?: boolean
}

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  rounded,
  outline,
  disabled,
  ...rest
}: ButtonProps) {

  const classes = twMerge(
    className(rest.className, 'flex items-center px-4 py-1.5 border rounded', {
      'border-blue-500 bg-blue-500 text-white hover:bg-blue-600': primary,
      'border-gray-800 bg-gray-800 text-white hover:bg-gray-900': secondary,
      'border-green-500 bg-green-500 text-white hover:bg-green-600': success,
      'border-yellow-400 bg-yellow-400 text-white hover:bg-yellow-500': warning,
      'border-red-500 bg-red-500 text-white hover:bg-red-600': danger,
      'bg-gray-100': disabled,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger
    })
  );

  return <button disabled={disabled} className={classes} {...rest}>{children}</button>
}

export default Button;