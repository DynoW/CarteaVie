import Image from "next/image";

export function Awards() {
  return (
    <section id="speakers" className="w-full py-16 bg-amber-900">
      <div className="container  mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-400">Peronalități și invitați</h2>
        
        <div className="flex flex-col md:flex-row gap-8 mx-auto">
          <div className="md:w-1/2 justify-center flex">
            <Image 
              src="/images/premiu.jpg" 
              alt="Ștefania Mihalache primind premiul pentru poezie" 
              width={1000}
              height={500}
              className="rounded-2xl border-3 border-white shadow-md"
            />
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white text-slate-900 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                🏆 Câștigătoarea categoriei poezie la Premiile Radio România Cultural
              </h3>
              <p className="font-medium text-lg mb-3">
                Ștefania Mihalache, pentru volumul &bdquo;Sunt liniștită, mi-e frică&rdquo;
              </p>
              <blockquote className="italic border-l-4 border-gray-300 pl-4 py-2 text-gray-700">
                &bdquo;Poezia nu este doar pentru copii, este, mai ales, pentru oameni mari. Mulțumesc Radio România Cultural pentru această distincție! Mulțumirile mele merg către mai multe locuri, pentru că aceasta nu este doar o carte — este o operă de artă, o carte-obiect. Poezia este destul de rar pusă la un nivel editorial calitativ de calibrul acesta.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}