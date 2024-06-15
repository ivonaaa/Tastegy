import { useState } from "react";
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSymbol, setHasSymbol] = useState(false);
    const { signup, error, isLoading } = useSignup()

    const validatePassword = (password) => {
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /\d/;
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

        setHasUppercase(uppercaseRegex.test(password));
        setHasNumber(numberRegex.test(password));
        setHasSymbol(symbolRegex.test(password));
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Email: </label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password: </label>
            <input
                type="password"
                onChange={handlePasswordChange}
                value={password}
            />
            <div className="password-checker">
                <small>Password must contain:</small>
                <ul>
                    <li className={hasUppercase ? 'valid' : 'invalid'}><small>At least one uppercase letter</small></li>
                    <li className={hasNumber ? 'valid' : 'invalid'}><small>At least one number</small></li>
                    <li className={hasSymbol ? 'valid' : 'invalid'}><small>At least one symbol</small></li>
                </ul>
            </div>
            <button type="submit" disabled={isLoading}>Sign up</button>
            { error && <div className="error">{ error }</div> }
        </form>
    );
};

export default Signup;
