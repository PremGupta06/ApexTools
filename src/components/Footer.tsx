import { Link } from "react-router-dom";
import { GraduationCap, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background-alt border-t border-white/10 relative overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 bg-f1-glow opacity-40" />

      <div className="container mx-auto px-4 lg:px-10 py-16 relative z-10">
        
        <div className="grid md:grid-cols-3 gap-10">

          {/* LOGO + DESC */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-lg mb-4"
            >
              <GraduationCap className="h-6 w-6 text-red-500" />
              <span className="text-gradient-f1">
                ApexTools
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Built like a racing machine — fast, powerful, and free tools for students worldwide.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="font-semibold mb-4 tracking-wide text-white">
              Quick Links
            </h4>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-red-400 transition">
                Home
              </Link>
              <Link to="/tools" className="text-muted-foreground hover:text-cyan-400 transition">
                Tools
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-white transition">
                About
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-purple-400 transition">
                Blog
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-red-400 transition">
                Contact
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-cyan-400 transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-purple-400 transition">
                Terms of Service
              </Link>
          
            </div>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="font-semibold mb-4 tracking-wide text-white">
              Connect
            </h4>

            <div className="flex gap-4">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              contact@apextools.com
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} 
          <span className="text-gradient-f1 ml-1">ApexTools</span>. 
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
