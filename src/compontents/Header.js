import logo from "../logo.svg";

const Header = () => {
    return (
        <header className="header__container">
            <div className="header__logo">
                <img src={logo} alt="logo" />
                <h1 className="header__title">React</h1>
            </div>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </header>
    );
};

export default Header;
