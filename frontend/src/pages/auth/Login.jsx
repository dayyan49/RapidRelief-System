import LoginForm from "../../components/auth/Loginform.jsx";
import PublicLayout from "../../layouts/PublicLayout.jsx";

const Login = () => (
  <PublicLayout hideFooter>
    <LoginForm />
  </PublicLayout>
);

export default Login;
