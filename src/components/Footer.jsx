import React from "react";
import { FaGithub, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-8 px-4 ">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
        {/* Icons */}
        <div className="flex space-x-6">
          {/* GitHub */}
          <a
            href="https://github.com/RanjanWorks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub size={20} />
          </a>

          {/* Email */}
          <a
            href="mailto:kashyapranjan9977@gmail.com"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaEnvelope size={20} />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/+916266245085"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>

        <p className="text-sm text-zinc-300">
          © {new Date().getFullYear()} Ranjan Kashyap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
