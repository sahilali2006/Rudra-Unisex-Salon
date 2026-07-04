import { useState } from "react";
import type { MouseEvent } from "react";
import type { Page } from "../App";
import logo from "../assets/logo.png";

const links: Array<{ page: Page; label: string; path: string }> = [
  { page: "home", label: "Home", path: "/" },
  { page: "about", label: "About", path: "/about" },
  { page: "services", label: "Services", path: "/services" },
  { page: "contact", label: "Contact", path: "/contact" },
];

export function Navbar({
  currentPage,
  onNavigate,
}: {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleNav = (event: MouseEvent<HTMLAnchorElement>, page: Page) => {
    event.preventDefault();
    setOpen(false);
    onNavigate(page);
  };

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <a
          className="brand-link"
          href="/"
          onClick={(event) => handleNav(event, "home")}
          aria-label="Rudra Unisex Salon home"
        >
          <img src={logo} alt="" />
          <span>
            Rudra <strong>Unisex Salon</strong>
          </span>
        </a>

        <div className="desktop-nav">
          {links.map((link) => (
            <a
              key={link.page}
              href={link.path}
              className={currentPage === link.page ? "active" : ""}
              aria-current={currentPage === link.page ? "page" : undefined}
              onClick={(event) => handleNav(event, link.page)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="nav-book"
            href="/contact"
            onClick={(event) => handleNav(event, "contact")}
          >
            Book Now
          </a>
        </div>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {open && (
        <div className="mobile-nav">
          {links.map((link) => (
            <a
              key={link.page}
              href={link.path}
              className={currentPage === link.page ? "active" : ""}
              aria-current={currentPage === link.page ? "page" : undefined}
              onClick={(event) => handleNav(event, link.page)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
