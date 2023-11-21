interface ButtonProps {
    className?: string;
    type?: "outline" | "fill";
    rounded?: "md" | "lg" | "sm" | "xl" | "2xl" | "3xl" | "full" | "none";
    color: "primary" | "secondary" | "gray";
    onClick?: () => void;
    children: React.ReactNode;
}
const colorStyle = {
    primary: {
        fill: "bg-teal-500 text-white hover:bg-teal-600",
        outline: "ring-1 ring-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white",
    },
    secondary: {
        fill: "bg-indigo-500 text-white hover:bg-indigo-600",
        outline: "ring-1 ring-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white",
    },
    gray: {
        fill: "bg-gray-500 text-white hover:bg-gray-600",
        outline: "ring-1 ring-gray-500 text-white hover:bg-gray-500",
    }
}
const roundedStyle = {
    md: "rounded-md",
    lg: "rounded-lg",
    sm: "rounded-sm",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
    none: "rounded-none",
}

function Button({ type = "outline", rounded = "md", className="", color, onClick, children }: ButtonProps) {

    const style = `${colorStyle[color][type]} ${roundedStyle[rounded]} ${className}`

    return ( 
    <button 
        className={`${style}`}
        onClick={onClick}>
            {children}
    </button> );
}

export default Button;