'use client'
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuthStore } from "../store/useAuthStore";
import LoginForm from "./loginForm"; 
import RegisterForm from "./registerForm";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const user = useAuthStore((state) => state.user);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Si l'utilisateur est connecté
  if (user) {
    return (
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <Image className="w-auto h-12 sm:h-16" src="/assets/image/logo.png" alt="Logo" width={100} height={40} />
          </div>

          <div className="flex flex-col md:flex-row md:mx-6">
            <Link className="my-2 text-[#efc066] transition-colors duration-300 transform hover:text-white md:mx-4 md:my-0" href="#">Home</Link>
            <Link className="my-2 text-[#efc066] transition-colors duration-300 transform hover:text-white md:mx-4 md:my-0" href={`/profil/${user.id}`}>Profile</Link>
            <Link className="my-2 text-[#efc066] transition-colors duration-300 transform hover:text-white md:mx-4 md:my-0" href="#" onClick={() => useAuthStore.getState().logout()}>Logout</Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Image className="w-auto h-12 sm:h-16" src="/assets/image/logo.png" alt="Logo" width={150} height={60} />
        </div>
        
        {/* Non connected Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:relative md:w-auto`}>
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link className="my-2 text-[#efc066] transition-colors duration-300 transform hover:text-[#FFFFFF] md:mx-4 md:my-0" href="#">Home</Link>

            <div className="relative" ref={menuRef}>
              <button
                className="my-2 text-[#efc066] transition-colors duration-300 transform hover:text-[#FFFFFF] md:mx-4 md:my-0"
                onClick={() => setIsOpen(!isOpen)}
              >
                Register/Login
              </button>
              {isOpen && (
                <div className="absolute bg-black shadow-lg rounded-lg mt-2 py-2 w-40">
                  <button
                    className="block px-4 py-2 text-[#efc066] transition-colors duration-300 transform hover:text-[#FFFFFF]"
                    onClick={() => { setIsLogin(true); setIsModalOpen(true); setIsOpen(false); }}
                  >
                    Login
                  </button>
                  <button
                    className="block px-4 py-2 text-[#efc066] transition-colors duration-300 transform hover:text-[#FFFFFF]"
                    onClick={() => { setIsLogin(false); setIsModalOpen(true); setIsOpen(false); }}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            <Link className="my-2 text-[#efc066] transition-colors duration-300 transform hover:text-[#FFFFFF] md:mx-4 md:my-0" href="#">Contact</Link>
            <Link className="my-2 text-[#efc066] transition-colors duration-300 transform hover:text-[#FFFFFF] md:mx-4 md:my-0" href="#">About</Link>
          </div>
        </div>
      </div>

      {/* Modal for Login ou Register */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <button
            onClick={() => { setIsModalOpen(false); setIsLogin(true); }}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {isLogin ? (
            <LoginForm setIsModalOpen={setIsModalOpen} />
          ) : (
            <RegisterForm setIsModalOpen={setIsModalOpen} />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
