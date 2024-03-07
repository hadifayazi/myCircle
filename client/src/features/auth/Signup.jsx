import { Link } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { PiCirclesThreePlus } from "react-icons/pi";
import Spiner from "../../components/Spiner";
import { useSelector } from "react-redux";
import { loginErrorSelector } from "./authSlice";
import { useEffect, useRef } from "react";
import { useSignupMutation } from "../../app/api/authApi";

const Signup = () => {
  const usernameRef = useRef(null);
  //   const navigate = useNavigate();
  const errMsg = useSelector(loginErrorSelector);
  const [signup, { isLoading }] = useSignupMutation();

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, [usernameRef]);

  if (isLoading) return <Spiner />;

  const handleSubmit = async (values) => {
    await signup(values);
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="m-5 p-10 bg-grey-3">
        <div className="w-[300px] max-w-md space-y-8 md:w-[400px] lg:w-[400px]">
          <div>
            <PiCirclesThreePlus className="mx-auto text-center text-4xl text-cust-btn" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
              Create an account
            </h2>
            {errMsg &&
              errMsg.message !== undefined &&
              errMsg.message !== "" && (
                <div className="text-red-500 text-center">{errMsg.message}</div>
              )}
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  className="border-b-[1px] border-neutral-800 w-full p-5 cursor-pointer my-3 bg-transparent outline-neutral-800  "
                  name="username"
                  type="text"
                  placeholder="Username"
                  innerRef={usernameRef}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  className="border-b-[1px] border-neutral-800 w-full p-5 cursor-pointer my-3 bg-transparent outline-neutral-800    "
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
                <Field
                  className="border-b-[1px] border-neutral-800 w-full p-5 cursor-pointer my-3 bg-transparent outline-neutral-800    "
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
                <button
                  className="bg-cust-btn my-2 w-full hover:bg-cust-btn-hover p-2 px-5 border rounded-full "
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign up
                </button>
              </Form>
            )}
          </Formik>
          <div className="flex items-center justify-between ">
            <div className="text-sm ">
              You already have an account?
              <Link to="/login">
                <span className="hover:text-sky-500 ml-2 transition-colors ">
                  Sign in here!
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
