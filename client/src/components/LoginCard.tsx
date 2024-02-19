const LoginCard = () => {
  return (
    <div className='flex-container'>
      <form className='login-card'>
        <h3 className='login-header'>Login</h3>
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginCard;
