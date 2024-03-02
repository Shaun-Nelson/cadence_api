import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUpCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      Navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex-container'>
      <form className='form-container' onSubmit={handleSubmit}>
        <h3 className='form-header'>Sign Up</h3>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type='submit' style={{ marginTop: "1em" }}>
          Sign Up
        </button>

        <p style={{ marginTop: "1em" }}>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpCard;
