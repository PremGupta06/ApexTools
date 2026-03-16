import { Link } from "react-router-dom";
import { GraduationCap, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg mb-3">
              <GraduationCap className="h-5 w-5" />
              Student Tools Hub
            </Link>
            <p className="text-sm opacity-70 leading-relaxed max-w-xs">
              Free productivity tools designed specifically for students worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
              <Link to="/tools" className="hover:opacity-100 transition-opacity">Tools</Link>
              <Link to="/about" className="hover:opacity-100 transition-opacity">About</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Connect</h4>
            <div className="flex gap-3">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="text-sm opacity-70 mt-3">contact@studenttoolshub.com</p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs opacity-50">
          © {new Date().getFullYear()} Student Tools Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
