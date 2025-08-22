import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Prototipado Rápido", href: "#" },
      { name: "Piezas Industriales", href: "#" },
      { name: "Modelos Arquitectónicos", href: "#" },
      { name: "Juguetes Personalizados", href: "#" },
      { name: "Piezas de Repuesto", href: "#" },
      { name: "Arte 3D", href: "#" }
    ],
    company: [
      { name: "Sobre Nosotros", href: "#about" },
      { name: "Nuestro Equipo", href: "#about" },
      { name: "Carreras", href: "#" },
      { name: "Blog", href: "#news" },
      { name: "Contacto", href: "#contact" }
    ],
    support: [
      { name: "Centro de Ayuda", href: "#" },
      { name: "Documentación", href: "#" },
      { name: "Soporte Técnico", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Estado del Servicio", href: "#" }
    ],
    legal: [
      { name: "Política de Privacidad", href: "#" },
      { name: "Términos de Servicio", href: "#" },
      { name: "Política de Cookies", href: "#" },
      { name: "Aviso Legal", href: "#" }
    ]
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <h3 className="text-3xl font-display font-bold glow-red">
                Z3D
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Líderes en impresión 3D profesional. Transformamos ideas en realidad con tecnología de vanguardia y un compromiso inquebrantable con la calidad.
            </p>
            
            {/* Cardinal Directions Logo */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-8 h-8 bg-cardinal-black rounded-full"></div>
              <div className="w-8 h-8 bg-cardinal-red rounded-full"></div>
              <div className="w-8 h-8 bg-cardinal-green rounded-full"></div>
              <div className="w-8 h-8 bg-cardinal-blue rounded-full"></div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F3] rounded-full flex items-center justify-center hover:bg-[#145db2] transition-colors duration-300" title="Facebook">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-colors duration-300" title="Instagram">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.678 1.315c-.98.98-1.187 2.092-1.245 3.373C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.612.058 1.281.265 2.393 1.245 3.373.98.98 2.092 1.187 3.373 1.245C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.265 3.373-1.245.98-.98 1.187-2.092 1.245-3.373.058-1.28.07-1.689.07-7.612 0-5.923-.012-6.332-.07-7.612-.058-1.281-.265-2.393-1.245-3.373-.98-.98-2.092-1.187-3.373-1.245C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-10.406a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </a>
              {/* TikTok (SVG oficial) */}
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300" title="TikTok">
                <svg className="w-5 h-5 text-white" viewBox="0 0 48 48" fill="none"><g><path d="M41.5 17.5c-3.6 0-6.5-2.9-6.5-6.5V6h-6.5v25.5c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.7 0 1.3.2 1.9.5v-6.2c-.6-.1-1.3-.2-1.9-.2-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10V23c1.9 1.1 4.1 1.8 6.5 1.8V17.5z" fill="#fff"/></g></svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#1da851] transition-colors duration-300" title="WhatsApp">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.26-1.64A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.72.98.99-3.62-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.03 2.81 1.18 3 .15.19 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-display font-semibold text-white mb-4">
              Servicios
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cardinal-green-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-display font-semibold text-white mb-4">
              Empresa
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="text-gray-400 hover:text-cardinal-blue-400 transition-colors duration-300 text-sm text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-display font-semibold text-white mb-4">
              Soporte
            </h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cardinal-red-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} Z3D. Todos los derechos reservados.
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center space-x-6">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 text-gray-400 hover:text-cardinal-green-400 transition-colors duration-300"
            >
              <span className="text-sm">Volver arriba</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Cardinal Directions Border */}
      <div className="h-1 bg-gradient-to-r from-cardinal-black via-cardinal-red via-cardinal-green to-cardinal-blue"></div>
    </footer>
  );
};

export default Footer;
