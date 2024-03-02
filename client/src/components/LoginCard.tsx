import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { RootState } from "../store";
import { toast } from "react-toastify";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      Navigate("/");
    }
  }, [userInfo, Navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      Navigate("/");
    } catch (error) {
      toast.error("Invalid username or password");
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
