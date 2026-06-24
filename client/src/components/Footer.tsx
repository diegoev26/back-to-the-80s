import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";

const socialLinks = [
  {
    id: 1,
    name: "Instagram",
    href: "https://instagram.com/fiestabacktothe80s",
    icon: <FaInstagram />,
  },
  {
    id: 2,
    name: "Facebook",
    href: "https://facebook.com/fiestabacktothe80s",
    icon: <FaFacebookF />,
  },
  {
    id: 3,
    name: "TikTok",
    href: "https://tiktok.com/@fiesta.back.to.th",
    icon: <FaTiktok />,
  },
  {
    id: 4,
    name: "YouTube",
    href: "https://youtube.com/@FiestaBacktothe80s",
    icon: <FaYoutube />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-white/5 py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Frase del Logo */}
        <div className="text-center">
          <p className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-2">
            La mejor fiesta 80s de Latinoamérica
          </p>
          <div className="h-1 w-20 bg-linear-to-r from-danger via-secondary to-warning mx-auto rounded-full" />
        </div>

        {/* Redes Sociales Dinámicas */}
        <div className="flex gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-muted text-2xl p-3 border border-white/10 rounded-full 
                         transition-all duration-300 
                         hover:text-primary hover:border-primary 
                         hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]
                         active:scale-90"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Info y Copyright */}
        <div className="flex flex-col items-center gap-4 text-[10px] text-muted/40 uppercase tracking-[0.2em] font-medium">
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Términos
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">
              Privacidad
            </a>
          </div>
          <p>
            © {new Date().getFullYear()} Back to the 80s — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
