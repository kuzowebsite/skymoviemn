import React, { useEffect } from "react";
import { FaGithub, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const existingScript = document.querySelector("script[src*='translate']");
      if (!existingScript) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // Initialize Google Translate with restricted languages
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en", // The source language of your page
              includedLanguages: "hi", // Restrict to Hindi (hi)
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
        };
      }
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="container mx-auto flex flex-col items-center space-y-6">
        {/* Visitor Counter */}
        <div className="flex items-center gap-3">

          <img
            className="h-6"
            src="https://counter6.optistats.ovh/private/freecounterstat.php?c=wqgfuz98ymkw9k58x5pduxja82e79jce"
            alt="website hit counter"
          />
        </div>

        {/* Google Translate */}
        <div className="flex items-center gap-2 space-y-1 bg-gradient-to-b from-zinc-900 to-zinc-800 px-3 py-1 rounded-sm">
          <p className="text-sm text-zinc-400">Language-Hindi</p>
          <div id="google_translate_element" className="translate-widget mb-5"></div>
        </div>

        {/* Social Links */}
        <div className="flex space-x-8">
          <a
            href="https://github.com/RanjanWorks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="mailto:kashyapranjan9977@gmail.com"
            className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
          >
            <FaEnvelope size={24} />
          </a>
          <a
            href="https://wa.me/+916266245085"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-transform transform hover:scale-110"
          >
            <FaWhatsapp size={24} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-zinc-300">
          © {new Date().getFullYear()} <span className="font-semibold">Ranjan Kashyap</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
