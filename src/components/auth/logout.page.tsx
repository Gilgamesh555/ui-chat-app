import { useEffect, useState } from "react";
import { useSession } from "../../contexts/sessionContext";
import { validateToken } from "../../endpoints/userapi";
import { Navigate } from "react-router-dom";

export default function LogOutUser({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userSession = useSession();

  useEffect(() => {
    const token = userSession.token;

    if (!token) {
      // No token found, redirect to login
      localStorage.removeItem("userSession");
      setIsLogged(false);
      setIsLoading(false);
      return;
    }

    validateToken(token).then((response) => {
      if (response === false) {
        localStorage.removeItem("userSession");
        setIsLogged(false);
        setIsLoading(false);
        return;
      }

      setIsLogged(true);
      setIsLoading(false);
    });
  }, [isLogged, userSession]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLogged) {
    return <Navigate to="/home/bar" />;
  }

  return <>{children}</>;
}
