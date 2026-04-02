const Nav = () => (
  <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-gradient-to-b from-dark/90 to-transparent backdrop-blur-sm">
    <div className="text-2xl font-black tracking-tighter text-muted">
      BACK TO{" "}
      <span className="text-primary underline decoration-secondary">
        THE 80S
      </span>
    </div>

    <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-muted">
      <a
        href="#comunidad"
        className="hover:text-primary transition-colors py-2"
      >
        Comunidad
      </a>
      <a href="#galeria" className="hover:text-primary transition-colors py-2">
        Galería
      </a>
      <a
        href="#entradas"
        className="bg-danger px-6 py-2 rounded-full hover:bg-primary hover:text-dark transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.5)] flex items-center justify-center"
      >
        Entradas
      </a>
    </div>
  </nav>
);

export default Nav;
