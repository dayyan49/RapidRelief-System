import { useContext,} from "react";
import AuthContext from "../context/AppContext.jsx";


const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;