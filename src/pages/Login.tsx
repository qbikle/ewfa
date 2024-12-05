import LoginForm from "../components/login-form";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-800">
      <div className="p-10 m-10 flex shadow-md h-full md:h-[80vh] gap-5 w-full bg-background md:m-10 rounded-xl border dark:border-gray-800 dark:bg-gray-900 dark:text-white">
        <LoginForm />
        <div className="md:flex w-1/2 hidden bg-gradient-to-tr from-primary-500 to-secondary-500 rounded-xl"></div>
      </div>
    </div>
  );
};

export default Login;
