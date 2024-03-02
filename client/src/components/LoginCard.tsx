import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Failed to fetch data");
      }

      setUsername("");
      setPassword("");

      Navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex-container'>
      <form className='form-container' onSubmit={handleSubmit}>
        <h3 className='form-header'>Login</h3>
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
        <button type='submit' style={{ marginTop: "1em" }}>
          Login
        </button>

        <p style={{ marginTop: "1em" }}>
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginCard;
