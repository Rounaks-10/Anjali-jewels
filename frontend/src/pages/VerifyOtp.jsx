import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/cartState";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  const { backendUrl, setToken } = useContext(CartContext);

  useEffect(() => {
    let timer;

    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Enter valid OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        email,
        otp: otpValue,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        setToken(response.data.token);

        toast.success("Account verified successfully");

        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/resend-otp`, {
        email,
      });

      if (response.data.success) {
        toast.success("OTP sent again");

        setResendTimer(30);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold">Verify Email</h1>
        <div className="mt-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff4ef]">
            <svg
              className="h-8 w-8 text-[#8a4a2f]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l9 6 9-6m-18 8h18V8H3v8z"
              />
            </svg>
          </div>
        </div>
        <p className="mt-3 text-center text-gray-500">OTP sent to {email}</p>

        <p className="text-center font-medium text-[#8a4a2f]">{email}</p>

        <div className="mt-8">
          <div
            className="flex justify-center gap-2 sm:gap-3"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="
          h-12 w-12
          rounded-lg
          border
          border-gray-300
          text-center
          text-xl
          font-semibold
          outline-none
          transition-all
          focus:border-[#8a4a2f]
          focus:ring-2
          focus:ring-[#ead7d0]
          sm:h-14
          sm:w-14
        "
              />
            ))}
          </div>
        </div>
        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-6 h-12 w-full rounded bg-[#8a4a2f] text-white"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="mt-5 text-center">
          {resendTimer > 0 ? (
            <p className="text-sm text-gray-500">
              Resend OTP in {resendTimer}s
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="font-semibold text-[#8a4a2f]"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
