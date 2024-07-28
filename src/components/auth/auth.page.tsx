import { useSession } from "../../contexts/sessionContext";
import { Navigate } from "react-router-dom";
import { validateToken } from "../../endpoints/userapi";
import { useEffect, useState } from "react";

export default function AuthUser({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
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
        return;
      }

      setIsLogged(true);
      setIsLoading(false);
    });
  }, [isLogged, userSession]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export async function testValidate(token: string) {
  const res = await validateToken(token);

  if (res === false) {
    return false;
  }

  return true;
}
