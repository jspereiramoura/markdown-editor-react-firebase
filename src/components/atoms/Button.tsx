import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`
      bg-white text-slate-900 h-10 rounded-lg
        hover:bg-opacity-90 hover:font-bold
        ${props.className ?? ""}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
