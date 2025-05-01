"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const people = [
  {
    name: "Dorica Boltașu",
    description: (
      <>
        <p className="font-medium text-lg mb-3">
          La ce este bună literatura? Vă mai există peste câteva decenii?
        </p>
        <blockquote className="italic border-l-4 border-gray-300 pl-4 py-2 text-gray-700">
          &bdquo;Literatura are o forță uriașă pentru că folosește narațiunea, pentru a crea lumi, reproducând ceea ce este în mintea noastră. Ca formă de divertisment, cititul devine o evadare către noi experiențe. Literatura din viitor va discuta despre Inteligență artificială și Chat GPT, încercând să intuiască  temele, suferințele noastre, pentru că adolescenții generațiilor următoare nu vor ști să pună întrebări despre sensul vieții. Prin urmare, literatura este o terapie pentru suflet. Motivația proiectului Cartea Vie  este aceea că noi suntem cărți vii, în ADN-ul nostru există cultură, deși nu citim mult, ne rezumam la un ziar, o știre, citim pragmatic, nu serios.&rdquo;
        </blockquote>
      </>
    ),
    image: "/images/dorica-boltasu.png",
  },
  {
    name: "Ștefania Mihalache",
    description: (
      <>
        <p className="font-medium text-lg mb-3">
          🏆 Câștigătoarea categoriei poezie la Premiile Radio România Cultural pentru volumul &bdquo;Sunt liniștită, mi-e frică&rdquo;
        </p>
        <blockquote className="italic border-l-4 border-gray-300 pl-4 py-2 text-gray-700">
          &bdquo;Poezia nu este doar pentru copii, este, mai ales, pentru oameni mari. Mulțumesc Radio România Cultural pentru această distincție! Mulțumirile mele merg către mai multe locuri, pentru că aceasta nu este doar o carte — este o operă de artă, o carte-obiect. Poezia este destul de rar pusă la un nivel editorial calitativ de calibrul acesta.&rdquo;
        </blockquote>
      </>
    ),
    image: "/images/stefania-mihalache.jpg",
  },
  {
    name: "Ștefan Firică",
    description: (
      <>
        <p className="font-medium text-lg mb-3">
          Ștefan Firică este lector universitar doctor la Facultatea de Litere a Universității din București, specializat în studii literare. Scrie despre literatură și este membru al Asociației Creatorilor de Ficțiune.
          <br />
          <br />
          A publicat două cărți: Autenticitatea, sensuri și nonsensuri. Teorii românești interbelice în contexte europene (2019) și Strategii ale (de)construcției identitare în proza românească interbelică (2019).
        </p>
      </>
    ),
    image: "/images/stefan-firica.jpg",
  },
];

export function Speakers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Handle visibility detection for animation
  useEffect(() => {
    setIsVisible(false);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? people.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === people.length - 1 ? 0 : prevIndex + 1));
  };

  const currentPerson = people[currentIndex];
  const shouldAnimate = isVisible !== null;

  return (
    <section 
      id="speakers" 
      ref={sectionRef}
      className="w-full py-16 bg-amber-900"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 
          className={`text-3xl font-bold text-center mb-12 text-amber-400 minecraft-regular ${
            shouldAnimate ? 'transition-all duration-700' : ''
          } ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Personalități și invitați
        </h2>
        {/* Main content - switch to column on mobile */}
        <div 
          className={`flex flex-col lg:flex-row items-center gap-4 lg:gap-8 lg:h-[438px] ${
            shouldAnimate ? 'transition-all duration-1000 delay-200' : ''
          } ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          {/* Mobile-only navigation buttons at top */}
          <div className="flex w-full justify-between mb-4 lg:hidden">
            <button
              onClick={handlePrev}
              className="bg-amber-800 hover:bg-amber-700 text-amber-200 px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              &larr; Anterior
            </button>
            {/* Navigation indicator for mobile */}
            <div className="flex items-center justify-center text-amber-400">
              <span>{currentIndex + 1} / {people.length}</span>
            </div>
            <button
              onClick={handleNext}
              className="bg-amber-800 hover:bg-amber-700 text-amber-200 px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Următor &rarr;
            </button>
          </div>

          {/* Desktop-only previous button */}
          <button
            onClick={handlePrev}
            className="hidden lg:block bg-amber-800 hover:bg-amber-700 text-amber-200 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            &larr;
          </button>

          {/* Image - full width on mobile */}
          <div 
            className={`w-full lg:w-1/3 flex justify-center mb-6 lg:mb-0 ${
              shouldAnimate ? 'transition-all duration-1000 delay-400' : ''
            } ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <div className="relative w-full max-w-sm">
              <Image
                src={currentPerson.image}
                alt={currentPerson.name}
                width={1000}
                height={500}
                className="rounded-2xl shadow-md w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900 rounded-2xl opacity-40"></div>
            </div>
          </div>

          {/* Content */}
          <div 
            className={`bg-white text-slate-900 p-4 sm:p-6 rounded-lg shadow-sm w-full lg:w-2/3 ${
              shouldAnimate ? 'transition-all duration-1000 delay-600' : ''
            } ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            <h3 className="text-xl font-semibold mb-2 minecraft-regular">{currentPerson.name}</h3>
            {currentPerson.description}
          </div>

          {/* Desktop-only next button */}
          <button
            onClick={handleNext}
            className="hidden lg:block bg-amber-800 hover:bg-amber-700 text-amber-200 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}