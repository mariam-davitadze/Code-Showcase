import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  authenticateWithToken,
  selectUserIsAuthenticated,
  selectUserToken,
} from "../store/slices/userSlice";
import { AppDispatch } from "../store";
import Loading from "../UI/Loading";

type RequireAuthProps = {
  children: JSX.Element;
};

/**
 * Route guard component that ensures a user is authenticated.
 * If a token exists, it validates it through Redux before allowing access.
 */
const RequireAuth = ({ children }: RequireAuthProps) => {
  const dispatch: AppDispatch = useDispatch();

  // Select auth data from Redux
  const userToken = useSelector(selectUserToken);
  const isAuthenticated = useSelector(selectUserIsAuthenticated);

  // Local loading state for the initial auth check
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // No token → stop loading and redirect
      if (!userToken) {
        setLoading(false);
        return;
      }

      // Token exists but user not yet authenticated → validate it
      if (!isAuthenticated) {
        try {
          await dispatch(authenticateWithToken({ token: userToken })).unwrap();
        } catch {
          // If token validation fails, redirect will handle it later
        }
      }

      // Always stop loading at the end
      setLoading(false);
    };

    checkAuth();
  }, [userToken, isAuthenticated, dispatch]);

  // Show loader during validation
  if (loading) return <Loading />;

  // Redirect unauthenticated users
  if (!userToken || !isAuthenticated) return <Navigate to="/sign_in" replace />;

  // Otherwise, render the protected content
  return children;
};

export default RequireAuth;
