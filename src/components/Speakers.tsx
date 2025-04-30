"use client";

import { useState } from "react";
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

export function Awards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? people.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === people.length - 1 ? 0 : prevIndex + 1));
  };

  const currentPerson = people[currentIndex];

  return (
    <section id="speakers" className="w-full py-16 bg-amber-900">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-400">Personalități și invitați</h2>

        <div className="flex flex-row items-center gap-8">
          <button
            onClick={handlePrev}
            className=""
          >
            &larr; Anterior
          </button>

            <div className="w-full md:w-1/3 flex justify-center mb-6">
            <div className="relative">
              <Image
              src={currentPerson.image}
              alt={currentPerson.name}
              width={1000}
              height={500}
              className="rounded-2xl shadow-md"
              />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900 rounded-2xl opacity-40"></div>
            </div>
            </div>
          <div className="bg-white text-slate-900 p-6 rounded-lg shadow-sm w-full md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">{currentPerson.name}</h3>
            {currentPerson.description}
          </div>

          <button
            onClick={handleNext}
            className=""
          >
            Următor &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}