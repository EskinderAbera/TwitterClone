import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
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
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const segment = useSegments();
  const router = useRouter();

  useEffect(() => {
    const loadAuthToken = async () => {
      const res = await SecureStore.getItemAsync("authToken");
      if (res) {
        setAuthToken(res);
        // setTokenLoaded(true);
      }
    };
    loadAuthToken();
  }, []);

  useEffect(() => {
    const isAuthGroup = segment[0] === "(auth)";
    if (!authToken && !isAuthGroup) {
      router.replace("/signIn");
    }
    if (authToken && isAuthGroup) {
      router.replace("/");
    }
  }, [segment, authToken]);

  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync("authToken", newToken);
    setAuthToken(newToken);
  };

  // // Render children only if the token is loaded
  // if (!tokenLoaded) {
  //   return null;
  // }

  return (
    <AuthContext.Provider value={{ authToken, updateAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
