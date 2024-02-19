import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch("/api/logout");

        if (response.ok) {
          navigate("/");
        } else {
          console.error("Failed to log out");
        }
      } catch (error) {
        console.error(error);
      }
    };
    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
