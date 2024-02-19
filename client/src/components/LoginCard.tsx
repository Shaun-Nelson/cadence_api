import { useState } from "react";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);

      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex-container'>
      <form className='login-card' onSubmit={handleSubmit}>
        <h3 className='login-header'>Login</h3>
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
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginCard;
