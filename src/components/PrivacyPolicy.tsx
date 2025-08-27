import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="section-full bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="section-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="glow-green">Política de</span>{" "}
            <span className="glow-blue">Privacidad</span>
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
              Introducción
            </h2>
            <p className="text-gray-300 leading-relaxed">
              En Z3D ("nosotros", "nuestro", "la empresa"), nos comprometemos a proteger y respetar su privacidad. 
              Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos su información personal 
              cuando utiliza nuestro sitio web z3d.pro y nuestros servicios de impresión 3D.
            </p>
          </div>

          {/* Información que recopilamos */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Información que Recopilamos
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-cardinal-green-400">
                  Información de Contacto
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Cuando utiliza nuestro formulario de contacto, recopilamos únicamente:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1 ml-4">
                  <li>Nombre completo</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Servicio de interés</li>
                  <li>Mensaje o consulta</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-cardinal-green-400">
                  Información Técnica
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Recopilamos automáticamente información técnica básica como:
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1 ml-4">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador</li>
                  <li>Sistema operativo</li>
                  <li>Páginas visitadas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cómo utilizamos su información */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Cómo Utilizamos su Información
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Utilizamos la información que recopilamos únicamente para:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong>Responder consultas:</strong> Para contactarle y responder a sus preguntas sobre nuestros servicios</li>
                <li><strong>Proporcionar servicios:</strong> Para ofrecerle cotizaciones y servicios de impresión 3D</li>
                <li><strong>Mejorar nuestro sitio:</strong> Para analizar el uso del sitio web y mejorar la experiencia del usuario</li>
                <li><strong>Cumplimiento legal:</strong> Para cumplir con nuestras obligaciones legales</li>
              </ul>
            </div>
          </div>

          {/* Almacenamiento de datos */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Almacenamiento de Datos
            </h2>
            <div className="bg-cardinal-red-500/10 border border-cardinal-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-cardinal-red-400">
                ⚠️ No Almacenamos Datos en Base de Datos
              </h3>
              <p className="text-gray-300 leading-relaxed">
                <strong>Importante:</strong> No almacenamos, guardamos ni conservamos sus datos personales en ninguna base de datos. 
                La información que nos proporciona a través del formulario de contacto se utiliza únicamente para:
              </p>
              <ul className="list-disc list-inside mt-3 text-gray-300 space-y-1 ml-4">
                <li>Enviar un email a nuestro equipo con su consulta</li>
                <li>Responder directamente a su correo electrónico</li>
                <li>Proporcionar el servicio solicitado</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-3">
                Una vez que respondemos a su consulta, no conservamos copias de sus datos personales en nuestros sistemas.
              </p>
            </div>
          </div>

          {/* Compartir información */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Compartir su Información
            </h2>
            <p className="text-gray-300 leading-relaxed">
              <strong>No vendemos, alquilamos ni compartimos su información personal</strong> con terceros, excepto:
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-300 space-y-2 ml-4">
              <li>Con su consentimiento explícito</li>
              <li>Para cumplir con obligaciones legales</li>
              <li>Para proteger nuestros derechos y seguridad</li>
            </ul>
          </div>

          {/* Seguridad */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Seguridad de Datos
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal 
              contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>
          </div>

          {/* Sus derechos */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Sus Derechos
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong>Acceso:</strong> Solicitar información sobre qué datos tenemos sobre usted</li>
              <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
              <li><strong>Eliminación:</strong> Solicitar la eliminación de sus datos</li>
              <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
              <li><strong>Oposición:</strong> Oponerse al procesamiento de sus datos</li>
            </ul>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed">
                             Nuestro sitio web utiliza cookies técnicas esenciales para su funcionamiento. 
               Para más información, consulte nuestra{" "}
               <a href="/cookies" className="text-cardinal-blue-400 hover:text-cardinal-blue-300 underline transition-colors duration-300">
                 Política de Cookies
               </a>.
            </p>
          </div>

          {/* Cambios en la política */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Cambios en esta Política
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos cualquier cambio 
              significativo publicando la nueva política en esta página y actualizando la fecha de "Última actualización".
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Contacto
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Si tiene alguna pregunta sobre esta Política de Privacidad o sobre cómo tratamos sus datos personales, 
              puede contactarnos en:
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

        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
