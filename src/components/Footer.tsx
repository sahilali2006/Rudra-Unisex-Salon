import type { MouseEvent } from "react";
import type { Page } from "../App";
import logo from "../assets/logo.png";

const footerLinks: Array<{ page: Page; label: string; path: string }> = [
  { page: "home", label: "Home", path: "/" },
  { page: "about", label: "About", path: "/about" },
  { page: "services", label: "Services", path: "/services" },
  { page: "contact", label: "Contact", path: "/contact" },
];

export function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const handleNav = (event: MouseEvent<HTMLAnchorElement>, page: Page) => {
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div>
          <img className="footer-logo" src={logo} alt="Rudra Unisex Salon" />
          <p>
            Premium unisex grooming for hair, beard, color and beauty services
            in Noida.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.page}>
                <a href={link.path} onClick={(event) => handleNav(event, link.page)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Hours</h3>
          <p>Monday to Sunday</p>
          <p>8:00 AM to 10:00 PM</p>
        </div>

        <div>
          <h3>Contact</h3>
          <p>
            <a href="tel:+918172931277">+91 81729 31277</a>
          </p>
          <p>Sector 104, Hajipur Gali No. 3, Noida</p>
          <p>
            <a href="https://www.instagram.com/sharmamukesh6758">
              Instagram
            </a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        Copyright {new Date().getFullYear()} Rudra Unisex Salon. All rights reserved.
      </div>
    </footer>
  );
}
