export interface ButtonProps {
    className?: string;
    type?: "outline" | "fill";
    rounded?: "md" | "lg" | "sm" | "xl" | "2xl" | "3xl" | "full" | "none";
    color: "primary" | "secondary" | "gray" | "red" | "white" | "lightblue";
    onClick?: () => void;
    children: React.ReactNode;
}
const colorStyle = {
    primary: {
        fill: "bg-teal-500 text-white hover:bg-teal-600",
        outline: "ring-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white hover:ring-0",
    },
    secondary: {
        fill: "bg-indigo-500 text-white hover:bg-indigo-600",
        outline: "ring-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white hover:ring-0",
    },
    gray: {
        fill: "bg-gray-500 text-white hover:bg-gray-600",
        outline: "ring-gray-500 text-white hover:bg-gray-500 hover:ring-0",
    },
    red: {
        fill: "bg-red-500 text-white hover:bg-red-600",
        outline: "ring-red-500 hover:bg-red-400 hover:text-white hover:ring-0",
    },
    white: {
        fill: "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-600",
        outline: "ring-white hover:bg-gray-300 hover:text-gray-800 hover:ring-0",
    },
    lightblue: {
        fill: "bg-[#2bb1e2] text-white hover:bg-[#2596bf]",
        outline: "ring-[#2bb1e2] text-blue-500 hover:bg-blue-400 hover:text-white hover:ring-0",
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