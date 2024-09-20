const Footer = () => {
    return (
      <footer className="py-6 md:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white border-t border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:h-10">
          <p className="text-center text-sm leading-relaxed md:text-left">
            Built by{" "}
            <span className="font-semibold text-gray-300">Mrinal Singha</span>
          </p>
          <a
            href="https://github.com/Mrinal-xx-Singha"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-500 underline underline-offset-4 cursor-pointer hover:text-green-400 transition"
          >
            GITHUB
          </a>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  