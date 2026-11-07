import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartState";
import axios from "axios";
const initialFormValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

const inputClassName =
  "mt-2 h-12 w-full rounded border border-gray-300 px-4 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-[#8a4a2f] focus:ring-2 focus:ring-[#ead7d0]";

const errorClassName = "mt-2 text-xs font-medium text-[#b42318]";

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};

const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(
    password,
  );
};

const Login = () => {
  const [mode, setMode] = React.useState("login");
  const [formValues, setFormValues] = React.useState(initialFormValues);
  const [errors, setErrors] = React.useState({});
  const [successMessage, setSuccessMessage] = React.useState("");
  const { backendUrl, setToken, token } = React.useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isSignup = mode === "signup";
  const redirectPath = location.state?.from || "/";

  React.useEffect(() => {
    if (token) {
      navigate(redirectPath);
    }
  }, [navigate, redirectPath, token]);

  if (token) {
    return null;
  }

  const updateField = (event) => {
    const { checked, name, type, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
    setSuccessMessage("");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setFormValues(initialFormValues);
    setErrors({});
    setSuccessMessage("");
  };

  const validateForm = () => {
    const nextErrors = {};
    const trimmedName = formValues.name.trim();
    const trimmedEmail = formValues.email.trim();
    const trimmedPhone = formValues.phone.trim();

    if (isSignup && trimmedName.length < 3) {
      nextErrors.name = "Enter at least 3 characters.";
    }

    if (!validateEmail(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (isSignup && !/^[6-9]\d{9}$/.test(trimmedPhone)) {
      nextErrors.phone = "Enter a valid 10 digit Indian mobile number.";
    }

    if (!validatePassword(formValues.password)) {
      nextErrors.password =
        "Use 8+ characters with uppercase, lowercase, number, and symbol.";
    }

    if (isSignup && formValues.confirmPassword !== formValues.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (isSignup && !formValues.acceptedTerms) {
      nextErrors.acceptedTerms = "Please accept the terms to continue.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isSignup) {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          acceptedTerms: formValues.acceptedTerms,
          email: formValues.email.trim(),
          name: formValues.name.trim(),
          password: formValues.password,
          phone: formValues.phone.trim(),
        });

        console.log(response.data);

        /*if (response.data.success && response.data.token) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate(redirectPath);
        }*/
        if (response.data.success && response.data.requiresVerification) {
          navigate(
            `/verify-otp?email=${encodeURIComponent(formValues.email.trim())}`,
          );

          return;
        }

        setSuccessMessage(response.data.message);
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email: formValues.email.trim(),
          password: formValues.password,
        });

        console.log(response.data);

        if (response.data.success && response.data.token) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate(redirectPath);
        }

        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      setErrors((currentErrors) => ({
        ...currentErrors,
        form: error.response?.data?.message || "Something went wrong.",
      }));
    }
  };

  return (
    <div className="mt-20 bg-white px-4 pb-16 sm:mt-8 lg:mt-0">
      <div className="py-5 text-sm text-gray-600">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">{">"}</span>
        <span className="font-medium text-[#8a4a2f]">
          {isSignup ? "Sign Up" : "Login"}
        </span>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <section className="rounded-md border border-[#ead7d0] bg-[#fffaf7] p-6">
          <p className="text-sm font-semibold uppercase text-[#8a4a2f]">
            Anjali Jewels account
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#2b0000] sm:text-4xl">
            Access faster checkout and order tracking
          </h1>
          <p className="mt-4 text-sm leading-6 text-gray-600">
            Sign in to manage your cart, view jewellery orders, and receive
            delivery updates from our team.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-gray-700">
            {[
              "Secure account access",
              "Saved delivery details",
              "Order updates",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded border border-[#ead7d0] bg-white px-4 py-3"
              >
                <span>{item}</span>
                <span className="font-semibold text-[#8a4a2f]">Included</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-gray-200 p-6">
          <div className="grid grid-cols-2 rounded border border-gray-300 p-1">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`h-11 rounded text-sm font-bold transition ${
                !isSignup
                  ? "bg-[#8a4a2f] text-white"
                  : "text-gray-600 hover:bg-[#fff2ec]"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`h-11 rounded text-sm font-bold transition ${
                isSignup
                  ? "bg-[#8a4a2f] text-white"
                  : "text-gray-600 hover:bg-[#fff2ec]"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            {isSignup && (
              <label className="block text-sm font-semibold text-black">
                Full Name
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={updateField}
                  placeholder="Enter full name"
                  className={inputClassName}
                />
                {errors.name && <p className={errorClassName}>{errors.name}</p>}
              </label>
            )}

            <label className="block text-sm font-semibold text-black">
              Email Address
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={updateField}
                placeholder="Enter email address"
                className={inputClassName}
              />
              {errors.email && <p className={errorClassName}>{errors.email}</p>}
            </label>

            {isSignup && (
              <label className="block text-sm font-semibold text-black">
                Mobile Number
                <input
                  type="tel"
                  name="phone"
                  value={formValues.phone}
                  onChange={updateField}
                  placeholder="10 digit mobile number"
                  className={inputClassName}
                />
                {errors.phone && (
                  <p className={errorClassName}>{errors.phone}</p>
                )}
              </label>
            )}

            <label className="block text-sm font-semibold text-black">
              Password
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={updateField}
                placeholder="Enter password"
                className={inputClassName}
              />
              {errors.password && (
                <p className={errorClassName}>{errors.password}</p>
              )}
            </label>

            {isSignup && (
              <label className="block text-sm font-semibold text-black">
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={updateField}
                  placeholder="Re-enter password"
                  className={inputClassName}
                />
                {errors.confirmPassword && (
                  <p className={errorClassName}>{errors.confirmPassword}</p>
                )}
              </label>
            )}

            {isSignup && (
              <label className="flex items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formValues.acceptedTerms}
                  onChange={updateField}
                  className="mt-1 h-4 w-4 accent-[#8a4a2f]"
                />
                <span>
                  I agree to receive account and order updates from Anjali
                  Jewels.
                  {errors.acceptedTerms && (
                    <span className="block text-xs font-medium text-[#b42318]">
                      {errors.acceptedTerms}
                    </span>
                  )}
                </span>
              </label>
            )}

            {successMessage && (
              <p className="rounded border border-[#b7dfc1] bg-[#f3fbf5] px-4 py-3 text-sm font-medium text-[#1f7a3a]">
                {successMessage}
              </p>
            )}

            {errors.form && (
              <p className="rounded border border-[#f4b4ad] bg-[#fff4f2] px-4 py-3 text-sm font-medium text-[#b42318]">
                {errors.form}
              </p>
            )}

            <button
              type="submit"
              className="h-12 w-full rounded bg-[#8a4a2f] px-6 text-sm font-bold text-white transition hover:bg-[#6f3923]"
            >
              {isSignup ? "Create Account" : "Login"}
            </button>

            {!isSignup && (
              <p className="text-center text-sm text-gray-600">
                New to Anjali Jewels?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="font-semibold text-[#8a4a2f] underline-offset-4 hover:underline"
                >
                  Create your account
                </button>
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
