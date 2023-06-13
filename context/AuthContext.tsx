import { useRouter, useSegments } from "expo-router";
import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const segment = useSegments();
  const router = useRouter();
  useEffect(() => {
    const isAuthGroup = segment[0] === "(auth)";
    if (!authToken && !isAuthGroup) {
      router.replace("/signIn");
    }
    if (authToken && isAuthGroup) {
      router.replace("/");
    }
  }, [segment, authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
