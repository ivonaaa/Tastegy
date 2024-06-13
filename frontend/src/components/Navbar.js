import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleClick = () => {
        logout();
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>
                        Tastegy
                    </h1>
                </Link>
                <nav>
                    <div className="hamburger" onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                        { user && (
                            <div>
                                <button onClick={handleClick}>Log out</button>
                                <Link to="/profile">
                                    <span onClick={toggleMenu}>{ user.email }</span>
                                </Link>
                            </div>
                        )}
                        { !user && (
                            <div>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;
