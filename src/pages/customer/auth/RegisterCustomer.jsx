import { toast } from "react-toastify";
import useRegisterForm from "../../../hooks/useRegisterForm";
import RegisterForm from "./components/RegisterForm";
// import icon from "../../../assets/logo/garden-logo.png";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function RegisterCustomer() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    validate,
  } = useRegisterForm();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await validate()) {
      try {
        const response = await axiosInstance.post("/auth/register", {
          name: username,
          email,
          password,
          role: "user",
        });

        toast.success(response.data.message);
        navigate("/signin");
      } catch (error) {
        toast.error(
          "Register failed: " + (error.response?.data?.message || error.message)
        );
      }
    }
  };

  return (
    <div>
      <section
        className="bg-beige
        font-playfair
      "
      >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            {/* <img className="h-44 mr-2" src={icon} alt="logo" /> */}
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Create Account
              </h1>
              <RegisterForm
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                errors={errors}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterCustomer;
