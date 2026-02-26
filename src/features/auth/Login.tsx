import React, { useState } from "react";
import loginImg from "../../assets/LoginImg.png";
import logo from "../../assets/LOGO.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: integrate Supabase auth here

    // TEMP: navigate to dashboard
    navigate("/admin");
  };

  return (
    <div className="flex h-screen w-full">
      {/* LEFT IMAGE */}
      <div className="w-1/2 h-full">
        <img
          src={loginImg}
          alt="Plant background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-1/2 bg-[#2E7D4F] flex items-center justify-center">
        <div className="w-[380px]">
          {/* LOGO + TITLE */}
          <form onSubmit={handleLogin} className="w-[380px]">
            <div className="mb-10">
              <img src={logo} alt="Plantern Logo" className="h-12 mb-4" />
              <p className="text-white text-lg opacity-80">Admin login</p>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              {/* Username */}
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 outline-none"
              />

              {/* Password */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-white text-gray-700 outline-none"
              />

              {/* Remember */}
              <div className="flex items-center gap-2 text-sm text-white">
                <input type="checkbox" className="accent-lime-400" />
                <span>Remember password</span>
              </div>

              {/* Button */}
              <button type="submit" className="w-full bg-lime-400 hover:bg-lime-300 transition py-3 rounded-xl font-semibold">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
