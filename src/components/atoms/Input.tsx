import { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`
      rounded-lg min-h-10 border-0 border-transparent text-slate-800 pl-3
      focus:outline-2 focus:outline-offset-2 focus:outline-blue-400
        ${className ?? ""}
      `}
    />
  );
};

export default Input;
