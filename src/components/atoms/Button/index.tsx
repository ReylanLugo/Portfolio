interface ButtonProps {
    className?: string;
    type?: "outline" | "fill";
    color: "primary" | "secondary";
    onClick?: () => void;
    children: React.ReactNode;
}

function Button({ type = "outline", className, color, onClick, children }: ButtonProps) {
    let style;
    if (type === "outline") {
        style = "ring-1  rounded-md";
    }

    let colorStyle;
    if (color === "primary") {
        colorStyle = type === "outline" ? "ring-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white" : "bg-teal-500 text-white hover:bg-teal-600 rounded-md";
    } else if (color === "secondary") {
        colorStyle = type === "outline" ? "ring-indigo-500 text-gray-500 hover:bg-indigo-500 hover:text-white" : "bg-indigo-500 text-white hover:bg-indigo-600 rounded-md";
    }

    return ( 
    <button 
        className={`${style} ${className} ${colorStyle}`}
        onClick={onClick}>
            {children}
    </button> );
}

export default Button;