import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../stores/contexts/AuthContext";
import Layout from "./Layout";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <Layout>
      <div className="max-w-[975px] mx-auto h-full">
        <Outlet />
      </div>
    </Layout>
  );
};

export default ProtectedRoute;
