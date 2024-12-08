import React, { useEffect } from "react";
import { FaGithub, FaEnvelope, FaWhatsapp ,FaLinkedin} from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";


import logo from "../assets/logoflix.svg";

const Footer = () => {
  return (
    <footer class="bg-white rounded-lg shadow dark:bg-zinc-900 m-4">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://linktr.ee/ranjankashyap"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src="https://i.ibb.co/Z2M7rLd/profile-pic-2.png" class="h-8" alt="Rflix Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Ranjan 
            </span>
          </a>

          <div className="flex space-x-5">
            <a
              href="https://buymeacoffee.com/ranjankashyap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-transform transform hover:scale-110"
            >
              <SiBuymeacoffee size={20} />
            </a>
            <a
              href="https://github.com/RanjanWorks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-transform transform hover:scale-110"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="mailto:kashyapranjan9977@gmail.com"
              className="text-zinc-400 hover:text-white transition-transform transform hover:scale-110"
            >
              <FaEnvelope size={20} />
            </a>
            <a
              href="https://wa.me/+916266245085"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-transform transform hover:scale-110"
            >
              <FaWhatsapp size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ishere-ranjan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-transform transform hover:scale-110"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
        <hr class="my-6 border-zinc-200 sm:mx-auto dark:border-zinc-700 lg:my-8" />
        <span class="block text-sm text-zinc-500 sm:text-center dark:text-zinc-400">
          © {new Date().getFullYear()}{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            Ranjan
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
