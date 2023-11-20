import Button from "../../atoms/Button";
import Link from "../../atoms/Link";
import Logo from "../../atoms/Logo";
import Nav from "../../molecules/Nav";

function Header() {
    return ( <>
    <header className="py-6 flex items-center text-sm">
        <Logo />
        <Nav className="inline-block h-full"/>
        <Button color="primary" className="ml-auto md:mr-12 px-3 py-2">Hire me</Button>
    </header>
    </> );
}

export default Header;