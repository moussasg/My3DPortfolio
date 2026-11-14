
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

    const navbarHighlighter = () => {
      const sections = document.querySelectorAll<HTMLElement>('section[id]');

      sections.forEach(current => {
        const sectionId = current.getAttribute('id');
        const sectionHeight = current.offsetHeight;
        const sectionTop =
          current.getBoundingClientRect().top - sectionHeight * 0.2;

        if (sectionTop < 0 && sectionTop + sectionHeight > 0) {
          setActive(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
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
        {/* min-w-0 + truncate let the title shrink, so it can never push the menu button off screen */}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img src={logo} alt="" className="h-9 w-9 shrink-0 object-contain" />
          <p className="cursor-pointer truncate text-[18px] font-bold text-white">
            {/* The full title only fits next to the links on wide screens */}
            <span className="xl:hidden">{config.html.fullName}</span>
            <span className="hidden xl:inline">{config.html.title}</span>
          </p>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden shrink-0 list-none flex-row gap-6 sm:flex lg:gap-10">
          {navLinks.map(nav => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? 'text-white' : 'text-secondary'
              } cursor-pointer text-[18px] font-medium hover:text-white`}
              onClick={() => handleClick(nav.id)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile navigation */}
        <div className="flex shrink-0 items-center justify-end sm:hidden">
          <button
            type="button"
            aria-label={toggle ? 'Close menu' : 'Open menu'}
            aria-expanded={toggle}
            aria-controls="mobile-menu"
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt=""
              className="h-[28px] w-[28px] object-contain"
            />
          </button>

          <div
            id="mobile-menu"
            className={`${
              toggle ? 'flex' : 'hidden'
            } bg-black opacity-75 absolute right-0 top-20 z-10 mx-4 my-2 min-w-[100px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map(nav => (
                <li
                  key={nav.id}
                  className={`font-poppins cursor-pointer text-[16px] font-medium ${
                    active === nav.id ? 'text-white' : 'text-secondary'
                  }`}
                  onClick={() => {
                    setToggle(false);
                    handleClick(nav.id);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
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
