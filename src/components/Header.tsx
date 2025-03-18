'use client';
import Link from 'next/link';
import styles from './styles.module.css';

export const Header = () => {

  const handleScroll = (
    event: React.UIEvent<HTMLDivElement> |
      React.MouseEvent<HTMLAnchorElement> |
      React.MouseEvent<HTMLSpanElement>,
    targetId: string,
  ) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className='hidden fixed w-[88vw] top 10px mx-auto py-5 md:flex flex-col gap-5 md:flex-row justify-between items-center z-50 bg-transparent'>
      <div className='flex relative'>
        <h1 className={`${styles.logoHeading} text-3xl font-bold mix-blend-difference drop-shadow-xl`}>
          CarteaVie
        </h1>
      </div>
      <div className='flex px-6 py-4 justify-center bg-white/60 backdrop-blur-lg rounded-full text-slate-900 font-semibold text-sm'>
        <ul className='flex flex-nowrap gap-5'>
          <li>
            <Link href="#" passHref>
              <span onClick={(event) => handleScroll(event, 'top')}>Acasă</span>
            </Link>
          </li>
          <li>
            <Link href="#about" passHref>
              <span onClick={(event) => handleScroll(event, 'about')}>Despre</span>
            </Link>
          </li>
          <li>
            <Link href="#personna" passHref>
              <span onClick={(event) => handleScroll(event, 'personna')}>Personalități</span>
            </Link>
          </li>
          <li>
            <Link href="#gallery" passHref>
              <span onClick={(event) => handleScroll(event, 'gallery')}>Galerie</span>
            </Link>
          </li>
          {/* <li>
            <Link href="#contact" passHref>
              <span onClick={(event) => handleScroll(event, 'contact')}>Contact</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}
