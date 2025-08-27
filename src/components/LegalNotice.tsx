import React from 'react';

const LegalNotice: React.FC = () => {
  return (
    <section className="section-full bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="section-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="glow-green">Aviso</span>{" "}
            <span className="glow-blue">Legal</span>
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
          
          {/* Información de la empresa */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Información de la Empresa
            </h2>
            <div className="bg-gray-800/50 rounded-lg p-6">
              <p className="text-gray-300 leading-relaxed">
                <strong>Denominación:</strong> Z3D
              </p>
              <p className="text-gray-300 leading-relaxed">
                <strong>Actividad:</strong> Servicios de impresión 3D y prototipado
              </p>
              <p className="text-gray-300 leading-relaxed">
                <strong>Sitio web:</strong> z3d.pro
              </p>
              <p className="text-gray-300 leading-relaxed">
                <strong>Email de contacto:</strong> consultas@z3d.pro
              </p>
            </div>
          </div>

          {/* Condiciones de uso */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Condiciones de Uso
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Al acceder y utilizar este sitio web, usted acepta estar sujeto a los siguientes términos y condiciones:
              </p>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-cardinal-green-400">
                  Uso Aceptable
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Usted se compromete a utilizar este sitio web únicamente para fines legales y de manera que no 
                  cause daño o perjuicio a otros usuarios o a la empresa.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-cardinal-green-400">
                  Propiedad Intelectual
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Todo el contenido de este sitio web, incluyendo textos, imágenes, diseños, logotipos y software, 
                  está protegido por derechos de autor y otras leyes de propiedad intelectual. Está prohibida la 
                  reproducción, distribución o modificación sin autorización previa.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-cardinal-green-400">
                  Enlaces Externos
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Este sitio web puede contener enlaces a sitios web de terceros. No nos hacemos responsables del 
                  contenido o las políticas de privacidad de estos sitios externos.
                </p>
              </div>
            </div>
          </div>

          {/* Limitación de responsabilidad */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Limitación de Responsabilidad
            </h2>
            <div className="bg-cardinal-red-500/10 border border-cardinal-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-cardinal-red-400">
                ⚠️ Información General
              </h3>
              <p className="text-gray-300 leading-relaxed">
                La información proporcionada en este sitio web es de carácter general y se ofrece "tal como está" 
                sin garantías de ningún tipo. Nos esforzamos por mantener la información actualizada y precisa, 
                pero no garantizamos su exactitud, integridad o actualidad.
              </p>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Servicios de Impresión 3D
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-cardinal-green-400">
                  Descripción de Servicios
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Ofrecemos servicios de impresión 3D, prototipado rápido, piezas industriales, modelos 
                  arquitectónicos, juguetes personalizados, piezas de repuesto y arte 3D.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-cardinal-green-400">
                  Proceso de Trabajo
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Recibimos su consulta a través del formulario de contacto</li>
                  <li>Evaluamos sus requerimientos y proporcionamos una cotización</li>
                  <li>Una vez aprobado, procedemos con la impresión 3D</li>
                  <li>Entregamos el producto final según los términos acordados</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-cardinal-green-400">
                  Limitaciones
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Los servicios están sujetos a la disponibilidad de materiales, capacidad de impresión y 
                  restricciones técnicas. Nos reservamos el derecho de rechazar proyectos que consideremos 
                  inapropiados o que violen derechos de terceros.
                </p>
              </div>
            </div>
          </div>

          {/* Precios y pagos */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Precios y Pagos
            </h2>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Los precios mostrados en el sitio web son orientativos y pueden variar según:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Complejidad del diseño</li>
                <li>Materiales utilizados</li>
                <li>Tamaño del proyecto</li>
                <li>Plazo de entrega</li>
                <li>Cantidad de unidades</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Los términos de pago se acuerdan individualmente para cada proyecto.
              </p>
            </div>
          </div>

          {/* Privacidad y datos */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Privacidad y Protección de Datos
            </h2>
            <p className="text-gray-300 leading-relaxed">
                             El tratamiento de sus datos personales se rige por nuestra{" "}
               <a href="/privacy" className="text-cardinal-blue-400 hover:text-cardinal-blue-300 underline transition-colors duration-300">
                 Política de Privacidad
               </a>. 
               Al utilizar nuestros servicios, usted acepta el tratamiento de sus datos según lo establecido 
               en dicha política.
            </p>
          </div>

          {/* Ley aplicable */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Ley Aplicable y Jurisdicción
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Las presentes condiciones se rigen por la legislación española. Cualquier disputa que pueda 
              surgir será resuelta en los tribunales competentes del territorio español.
            </p>
          </div>

          {/* Modificaciones */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Modificaciones
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
              Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. 
              Le recomendamos revisar periódicamente esta página.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-4 text-white">
              Contacto
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Si tiene alguna pregunta sobre este Aviso Legal, puede contactarnos en:
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

export default LegalNotice;
