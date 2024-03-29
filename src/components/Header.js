import { useState, useEffect } from "react";
import { NavHashLink } from "react-router-hash-link";
import { IonIcon } from "@ionic/react";
import {
  closeOutline,
  contrastOutline,
  menuOutline,
  desktopOutline,
  sunnyOutline,
  moonOutline,
  phonePortraitOutline,
} from "ionicons/icons";

import "./Header.css";

export function Header({
  isHeaderSticky,
  isOnPublicationsPage,
  isOnNotFoundPage,
  scrollWithOffset,
}) {
  const [isMobile, setMobile] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 605);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`header${isHeaderSticky ? " sticky" : ""}${
        isOnPublicationsPage || isOnNotFoundPage ? " on-publications" : ""
      }${isMobileNavOpen ? " nav-open" : ""}`}
    >
      <LogoLink />
      <MainNav
        isMobile={isMobile}
        isMobileNavOpen={isMobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        isHeaderSticky={isHeaderSticky}
        isOnPublicationsPage={isOnPublicationsPage}
        isOnNotFoundPage={isOnNotFoundPage}
        scrollWithOffset={scrollWithOffset}
      />
      {/* {!isMobile ? ( */}
      {/*   <SiteOptions */}
      {/*     isHeaderSticky={isHeaderSticky} */}
      {/*     isOnPublicationsPage={isOnPublicationsPage} */}
      {/*     isMobileNavOpen={isMobileNavOpen} */}
      {/*   /> */}
      {/* ) : null} */}
      {isMobile ? (
        <MobileNav
          isMobileNavOpen={isMobileNavOpen}
          setMobileNavOpen={setMobileNavOpen}
        />
      ) : null}
    </header>
  );
}

function LogoLink() {
  return (
    <NavHashLink to="/#top" smooth={true} duration={500}>
      <img
        className="header__logo"
        src="images/logo.png"
        alt="Lucas Veras logo"
      />
    </NavHashLink>
  );
}

function MainNav({
  isMobile,
  isMobileNavOpen,
  setMobileNavOpen,
  isHeaderSticky,
  isOnPublicationsPage,
  isOnNotFoundPage,
  scrollWithOffset,
}) {
  const handleClick = () => setMobileNavOpen(!isMobileNavOpen);

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li>
          <NavHashLink
            className="main-nav__link"
            to="/#about"
            smooth={true}
            duration={500}
            onClick={handleClick}
          >
            About
          </NavHashLink>
        </li>
        <li>
          <NavHashLink
            className="main-nav__link"
            to="/#tools"
            smooth={true}
            duration={500}
            scroll={(el) => scrollWithOffset(el)}
            onClick={handleClick}
          >
            Tools
          </NavHashLink>
        </li>
        <li>
          <NavHashLink
            className="main-nav__link"
            to="/#projects"
            smooth={true}
            duration={500}
            scroll={(el) => scrollWithOffset(el)}
            onClick={handleClick}
          >
            Projects
          </NavHashLink>
        </li>
        <li>
          <NavHashLink
            className="main-nav__link"
            to="/#contact"
            smooth={true}
            duration={500}
            scroll={(el) => scrollWithOffset(el)}
            onClick={handleClick}
          >
            Contact
          </NavHashLink>
        </li>
        {/* {isMobile ? ( */}
        {/*   <li> */}
        {/*     <SiteOptions */}
        {/*       isHeaderSticky={isHeaderSticky} */}
        {/*       isOnPublicationsPage={isOnPublicationsPage} */}
        {/*       isOnNotFoundPage={isOnNotFoundPage} */}
        {/*       isMobileNavOpen={isMobileNavOpen} */}
        {/*     /> */}
        {/*   </li> */}
        {/* ) : null} */}
      </ul>
    </nav>
  );
}

function SiteOptions({
  isHeaderSticky,
  isOnPublicationsPage,
  isOnNotFoundPage,
  isMobileNavOpen,
}) {
  const [isActive, setActive] = useState(false);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    if (!isMobileNavOpen) {
      setActive(false);
    }
  }, [isMobileNavOpen]);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 605);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const darkModeData = [
    {
      title: "OS Default",
      icon: isMobile ? phonePortraitOutline : desktopOutline,
    },
    { title: "Light", icon: sunnyOutline },
    { title: "Dark", icon: moonOutline },
  ];

  return (
    <div
      className={`site-options${isHeaderSticky ? " sticky" : ""}${
        isOnPublicationsPage ? " on-publications" : ""
      }`}
    >
      <IonIcon
        className="site-options__icon"
        icon={contrastOutline}
        onClick={() => {
          setActive(!isActive);
        }}
      />
      {isActive ? (
        <DarkModeMenu
          data={darkModeData}
          isHeaderSticky={isHeaderSticky}
          isOnPublicationsPage={isOnPublicationsPage}
          isOnNotFoundPage={isOnNotFoundPage}
        />
      ) : null}
    </div>
  );
}

function DarkModeMenu({
  data,
  isHeaderSticky,
  isOnPublicationsPage,
  isOnNotFoundPage,
}) {
  return (
    <ul
      className={`dark-mode__menu${isHeaderSticky ? " sticky" : ""}${
        isOnPublicationsPage || isOnNotFoundPage ? " on-publications" : ""
      }`}
    >
      {data.map((data) => (
        <DarkModeItem key={data.title} data={data} />
      ))}
    </ul>
  );
}

function DarkModeItem({ data }) {
  return (
    <li className="dark-mode__item">
      <IonIcon className="dark-mode__icon" icon={data.icon} />
      <span className="dark-mode__title">{data.title}</span>
    </li>
  );
}

function MobileNav({ isMobileNavOpen, setMobileNavOpen }) {
  return (
    <button
      className="mobile-nav__btn"
      onClick={() => setMobileNavOpen(!isMobileNavOpen)}
    >
      {isMobileNavOpen ? (
        <IonIcon className="mobile-nav__icon" icon={closeOutline} />
      ) : (
        <IonIcon className="mobile-nav__icon" icon={menuOutline} />
      )}
    </button>
  );
}
