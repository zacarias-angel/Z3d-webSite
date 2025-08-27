import React from 'react';

const CookiePolicy: React.FC = () => {
  return (
    <section className="section-full bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="section-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="glow-green">Política de</span>{" "}
            <span className="glow-blue">Cookies</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cardinal-green-500 to-cardinal-blue-500 hover:from-cardinal-green-600 hover:to-cardinal-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ← Volver al Inicio
          </a>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 space-y-8">
          
          {/* Introducción */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              ¿Qué son las Cookies?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet o móvil) 
              cuando visita un sitio web. Estas cookies permiten que el sitio web recuerde sus acciones y preferencias 
              durante un período de tiempo determinado.
            </p>
          </div>

          {/* Tipos de cookies que utilizamos */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Tipos de Cookies que Utilizamos
            </h2>
            <div className="space-y-6">
              
              <div className="bg-cardinal-green-500/10 border border-cardinal-green-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-cardinal-green-400">
                  🍪 Cookies Técnicas (Necesarias)
                </h3>
                <p className="text-gray-300 leading-relaxed mb-3">
                  Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Mantener su sesión activa</li>
                  <li>Recordar sus preferencias de idioma</li>
                  <li>Garantizar la seguridad del sitio web</li>
                  <li>Permitir la navegación básica</li>
                </ul>
              </div>

              <div className="bg-cardinal-blue-500/10 border border-cardinal-blue-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-cardinal-blue-400">
                  📊 Cookies de Análisis (Opcionales)
                </h3>
                <p className="text-gray-300 leading-relaxed mb-3">
                  Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Analizar el tráfico del sitio web</li>
                  <li>Identificar páginas más visitadas</li>
                  <li>Mejorar la experiencia del usuario</li>
                  <li>Detectar problemas técnicos</li>
                </ul>
              </div>

              <div className="bg-cardinal-red-500/10 border border-cardinal-red-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-cardinal-red-400">
                  🚫 No Utilizamos Cookies de Marketing
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  <strong>Importante:</strong> No utilizamos cookies de seguimiento, publicidad o marketing. 
                  No vendemos ni compartimos información de navegación con terceros para fines comerciales.
                </p>
              </div>

            </div>
          </div>

          {/* Cookies específicas */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Cookies Específicas de Nuestro Sitio
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-cardinal-green-400 font-semibold">Cookie</th>
                    <th className="py-3 px-4 text-cardinal-green-400 font-semibold">Propósito</th>
                    <th className="py-3 px-4 text-cardinal-green-400 font-semibold">Duración</th>
                    <th className="py-3 px-4 text-cardinal-green-400 font-semibold">Tipo</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4">session_id</td>
                    <td className="py-3 px-4">Mantener sesión activa</td>
                    <td className="py-3 px-4">Sesión</td>
                    <td className="py-3 px-4">
                      <span className="bg-cardinal-green-500/20 text-cardinal-green-400 px-2 py-1 rounded text-sm">
                        Necesaria
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4">language</td>
                    <td className="py-3 px-4">Preferencia de idioma</td>
                    <td className="py-3 px-4">1 año</td>
                    <td className="py-3 px-4">
                      <span className="bg-cardinal-green-500/20 text-cardinal-green-400 px-2 py-1 rounded text-sm">
                        Necesaria
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-3 px-4">_ga</td>
                    <td className="py-3 px-4">Análisis de tráfico (Google Analytics)</td>
                    <td className="py-3 px-4">2 años</td>
                    <td className="py-3 px-4">
                      <span className="bg-cardinal-blue-500/20 text-cardinal-blue-400 px-2 py-1 rounded text-sm">
                        Análisis
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">_ga_*</td>
                    <td className="py-3 px-4">Análisis de sesión (Google Analytics)</td>
                    <td className="py-3 px-4">1 día</td>
                    <td className="py-3 px-4">
                      <span className="bg-cardinal-blue-500/20 text-cardinal-blue-400 px-2 py-1 rounded text-sm">
                        Análisis
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Gestión de cookies */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Gestión de Cookies
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-cardinal-green-400">
                  Configuración del Navegador
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Puede configurar su navegador para rechazar todas las cookies o para recibir una notificación 
                  cuando se envíe una cookie. Sin embargo, si rechaza las cookies, es posible que algunas partes 
                  de nuestro sitio web no funcionen correctamente.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-cardinal-green-400">
                  Cómo Desactivar Cookies
                </h3>
                <p className="text-gray-300 leading-relaxed mb-3">
                  Para desactivar las cookies en su navegador:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                  <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                  <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                  <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-cardinal-green-400">
                  Eliminar Cookies Existentes
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Puede eliminar las cookies existentes en cualquier momento a través de la configuración 
                  de su navegador. Esto hará que tenga que volver a introducir sus preferencias.
                </p>
              </div>
            </div>
          </div>

          {/* Cookies de terceros */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Cookies de Terceros
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Nuestro sitio web puede utilizar servicios de terceros que instalan sus propias cookies:
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-cardinal-blue-400">
                  Google Analytics
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Utilizamos Google Analytics para analizar el tráfico de nuestro sitio web. Google Analytics 
                  utiliza cookies para recopilar información sobre cómo los usuarios navegan por nuestro sitio. 
                  Esta información se utiliza para mejorar nuestro sitio web.
                </p>
                <p className="text-gray-300 leading-relaxed mt-2">
                  <strong>Política de privacidad de Google:</strong>{" "}
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cardinal-blue-400 hover:text-cardinal-blue-300 underline"
                  >
                    https://policies.google.com/privacy
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Actualizaciones */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Actualizaciones de esta Política
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en nuestras 
              prácticas o por otras razones operativas, legales o reglamentarias. Le notificaremos cualquier 
              cambio significativo publicando la nueva política en esta página.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Contacto
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Si tiene alguna pregunta sobre nuestra Política de Cookies, puede contactarnos en:
            </p>
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
              <p className="text-gray-300">
                <strong>Email:</strong> consultas@z3d.pro
              </p>
              <p className="text-gray-300">
                <strong>Sitio web:</strong> z3d.pro
              </p>
            </div>
          </div>

          {/* Enlaces relacionados */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Enlaces Relacionados
            </h2>
            <div className="flex flex-wrap gap-4">
              <a 
                href="/privacy" 
                className="bg-cardinal-green-500/20 hover:bg-cardinal-green-500/30 text-cardinal-green-400 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Política de Privacidad
              </a>
              <a 
                href="/legal" 
                className="bg-cardinal-blue-500/20 hover:bg-cardinal-blue-500/30 text-cardinal-blue-400 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Aviso Legal
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CookiePolicy;
