import { useState } from "react";

//Compoenents
import NavBar from "../components/NavBar";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
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
            type='email'
            placeholder='Email'
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
