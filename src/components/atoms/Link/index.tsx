interface LinkProps {
    className?: string;
    color: "gray" | "primary" | "secondary";
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

function Link({ className, color, onClick, children, href="#" }: LinkProps) {
    let colorStyle;
    if (color === "gray") {
        colorStyle = "text-gray-400 hover:text-gray-300";
    }
    
    return ( <a
        className={`${className} ${colorStyle}`}	
        href={href}
        onClick={onClick}
    >
        {children}
        </a> );
}

export default Link;