import Link from "../../atoms/Link";
import NavList from "../../atoms/NavList";

interface NavProps {
    className?: string;
}

function Nav({ className }: NavProps) {
    return ( 
    <nav className={`${className}`}>
        <NavList>
            <li>
                <Link color="gray">About</Link>
            </li>
            <li>
                <Link color="gray">Resume</Link>
            </li>
            <li>
                <Link color="gray">Services</Link>
            </li>
            <li>
                <Link color="gray">Projects</Link>
            </li>
            <li>
                <Link color="gray">Contact</Link>
            </li>
        </NavList>
    </nav> );
}

export default Nav;