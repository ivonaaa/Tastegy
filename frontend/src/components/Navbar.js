import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>
                        Tastegy
                    </h1>
                </Link>
                <Link to="/AddRecipe">
                    Add Recipe
                </Link>
            </div>
        </header>
    )
}

export default Navbar