import {Redirect} from "expo-router";
import {Text} from "react-native";
import {useAuth} from "./AuthContexts";
import SplashScreen from "@/components/ui/SplashScreen";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
  const {user, loading} = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
