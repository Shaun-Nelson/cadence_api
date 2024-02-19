import { useState } from "react";

//Compoenents
import NavBar from "../components/NavBar";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className='flex-container'>
        <form className='signup-card' onSubmit={handleSubmit}>
          <h3 className='signup-header'>Sign Up</h3>
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
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
