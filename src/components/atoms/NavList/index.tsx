interface NavListProps {
    type?: "row" | "column";
    className?: string;
    children: React.ReactNode;
}

function NavList({className, type = "row", children}: NavListProps) {
    const styles = type === "row" ? "flex flex-row justify-end" : "flex flex-col";
    return ( <ul className={`${className} ${styles} [&>li]:ml-12`}>
        {children}
    </ul> );
}

export default NavList;