import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../../constants/styles';
import { navLinks } from '../../constants';
import { logo, menu, close } from '../../assets';
import { config } from '../../constants/config';

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setActive('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    const navbarHighlighter = () => {
      const sections = document.querySelectorAll<HTMLElement>('section[id]');

      sections.forEach(current => {
        const sectionId = current.getAttribute('id');
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener('scroll', navbarHighlighter);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', navbarHighlighter);
    };
  }, []);
  const handleClick = (id: string) => {
    setActive(id === active ? null : id);
  };
  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-20 flex w-full items-center py-5 ${
        scrolled ? 'bg-primary' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
          <p className="flex cursor-pointer text-[18px] font-bold text-white">
            {config.html.title}
          </p>
        </Link>
        <ul className="hidden list-none flex-row gap-10 sm:flex">
          {navLinks.map(nav => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? 'text-white' : 'text-secondary'
              } cursor-pointer text-[18px] font-medium hover:text-white`}
              onClick={() => handleClick(nav.id)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              {active === 'blogs' &&
                nav.subtitle && ( // Vérifier si le lien actif est 'blogs'
                  <ul className="absolute z-50 shadow-md rounded-md mt-1 space-y-2">
                    {nav.subtitle.map((subtitle, index) => (
                      <li key={index}>
                        {' '}
                        {/*go to constants/index.ts / TNavLink*/}
                        <a className={subtitle.className} href={subtitle.href} target="_blank">
                          {subtitle.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="h-[28px] w-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${ (!toggle && active !== 'blogs') ? 'hidden' : 'flex'} bg-black opacity-75 absolute right-0 top-20 z-10 mx-4 my-2 min-w-[100px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map(nav => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer text-[16px] font-medium ${
                    active === nav.id ? 'text-white' : 'text-secondary'
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    handleClick(nav.id);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                  {active === 'blogs' && nav.subtitle && ( // Vérifier si le lien actif est 'blogs'
                  <ul className="absolute z-50 shadow-md rounded-md mt-1 space-y-2">
                    {nav.subtitle.map((subtitle, index) => (
                      <li key={index} onClick={() => handleClick(nav.id)}>
                        {/*go to constants/index.ts / TNavLink*/}
                        <a className={subtitle.className} href={subtitle.href} target="_blank">
                          {subtitle.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
