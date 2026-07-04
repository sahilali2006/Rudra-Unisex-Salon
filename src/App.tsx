import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import { Layout } from "./components/Layout";
import heroImg from "./assets/hero.jpg";
import aboutImg from "./assets/about.jpg";
import womenImg from "./assets/service-women.jpg";
import beardImg from "./assets/service-beard.jpg";
import colorImg from "./assets/service-color.jpg";

export type Page = "home" | "about" | "services" | "contact";

const pagePaths: Record<Page, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  contact: "/contact",
};

const pageMeta: Record<Page, { title: string; description: string }> = {
  home: {
    title: "Rudra Unisex Salon | Premium Hair & Grooming Studio",
    description:
      "Rudra Unisex Salon in Noida offers haircuts, beard grooming, styling, color and beauty services.",
  },
  about: {
    title: "About Rudra Unisex Salon",
    description:
      "Meet Rudra Unisex Salon, a warm Noida grooming studio focused on sharp craft, comfort and care.",
  },
  services: {
    title: "Services & Pricing | Rudra Unisex Salon",
    description:
      "Explore haircut, beard, color, treatment, styling and beauty pricing at Rudra Unisex Salon.",
  },
  contact: {
    title: "Book Appointment | Rudra Unisex Salon",
    description:
      "Call or send a booking request to Rudra Unisex Salon in Sector 104, Noida.",
  },
};

const services = [
  {
    image: beardImg,
    title: "Haircut & Beard",
    description:
      "Sharp cuts, fades, beard trims and finishing touches for clean everyday confidence.",
  },
  {
    image: womenImg,
    title: "Styling & Blow Dry",
    description:
      "Polished styling for events, workdays and the moments when you want a little extra.",
  },
  {
    image: colorImg,
    title: "Color & Treatment",
    description:
      "Color, highlights, hair spa and nourishing treatments tailored to your hair.",
  },
];

const stats = [
  { value: "5000+", label: "Happy clients" },
  { value: "10+", label: "Years experience" },
  { value: "4.9", label: "Average rating" },
  { value: "20+", label: "Salon services" },
];

const serviceCategories = [
  {
    image: heroImg,
    title: "Hair Cutting",
    items: [
      { name: "Men's Haircut", price: "Rs. 250" },
      { name: "Women's Haircut", price: "Rs. 500" },
      { name: "Kids Haircut", price: "Rs. 200" },
      { name: "Fade / Beard Trim", price: "Rs. 150" },
    ],
  },
  {
    image: beardImg,
    title: "Beard & Shave",
    items: [
      { name: "Beard Styling", price: "Rs. 150" },
      { name: "Clean Shave", price: "Rs. 120" },
      { name: "Royal Shave", price: "Rs. 250" },
      { name: "Beard Color", price: "Rs. 300" },
    ],
  },
  {
    image: colorImg,
    title: "Color & Treatment",
    items: [
      { name: "Global Hair Color", price: "Rs. 1200" },
      { name: "Highlights", price: "Rs. 1800" },
      { name: "Hair Spa", price: "Rs. 700" },
      { name: "Keratin Treatment", price: "Rs. 3000" },
    ],
  },
  {
    image: womenImg,
    title: "Styling & Beauty",
    items: [
      { name: "Blow Dry", price: "Rs. 400" },
      { name: "Hair Straightening", price: "Rs. 900" },
      { name: "Facial", price: "Rs. 600" },
      { name: "Bridal Makeup", price: "Rs. 5000" },
    ],
  },
];

const values = [
  {
    title: "Expert stylists",
    description: "A focused team trained in cuts, styling, color and grooming detail.",
  },
  {
    title: "Comfort first",
    description: "A hygienic studio, friendly service and clear guidance before every service.",
  },
  {
    title: "Reliable finish",
    description: "Premium products and careful finishing so your look lasts beyond the chair.",
  },
];

function pageFromPath(pathname: string): Page {
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/services")) return "services";
  if (pathname.startsWith("/contact")) return "contact";
  return "home";
}

function App() {
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPage(pageFromPath(window.location.pathname));

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const meta = pageMeta[page];
    document.title = meta.title;

    const description =
      document.querySelector<HTMLMetaElement>('meta[name="description"]') ??
      document.head.appendChild(document.createElement("meta"));

    description.name = "description";
    description.content = meta.description;
  }, [page]);

  const navigate = (nextPage: Page) => {
    const nextPath = pagePaths[nextPage];

    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }

    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout currentPage={page} onNavigate={navigate}>
      {page === "home" && <HomePage onNavigate={navigate} />}
      {page === "about" && <AboutPage onNavigate={navigate} />}
      {page === "services" && <ServicesPage onNavigate={navigate} />}
      {page === "contact" && <ContactPage />}
    </Layout>
  );
}

function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      <section className="hero-section">
        <img
          className="hero-image"
          src={heroImg}
          alt="A stylist cutting hair inside Rudra Unisex Salon"
        />
        <div className="hero-overlay" />
        <div className="section-shell hero-content">
          <p className="eyebrow">Sector 104, Noida</p>
          <h1>Rudra Unisex Salon</h1>
          <p className="hero-copy">
            Premium cuts, beard care, color and styling for people who want their
            everyday look to feel intentional.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onNavigate("contact")}>
              Book Appointment
            </button>
            <button className="btn btn-secondary" onClick={() => onNavigate("services")}>
              View Services
            </button>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="section-shell stats-grid">
          {stats.map((item) => (
            <div className="stat-item" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-block">
        <SectionTitle eyebrow="Signature work" title="Services people come back for" />
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <img src={service.image} alt={service.title} loading="lazy" />
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="section-shell cta-content">
          <p className="eyebrow">Fresh look, simple booking</p>
          <h2>Walk in with a plan. Walk out looking sharper.</h2>
          <button className="btn btn-primary" onClick={() => onNavigate("contact")}>
            Reserve Your Slot
          </button>
        </div>
      </section>
    </>
  );
}

function AboutPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      <section className="section-shell page-intro">
        <div>
          <SectionTitle eyebrow="Who we are" title="A modern salon with careful hands" />
          <p>
            Rudra Unisex Salon brings together sharp barbering, relaxed styling and
            beauty services in one welcoming studio. We keep the experience clear,
            comfortable and personal from the first conversation to the final look.
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate("contact")}>
            Book A Visit
          </button>
        </div>
        <img src={aboutImg} alt="Interior of Rudra Unisex Salon" loading="lazy" />
      </section>

      <section className="contrast-band">
        <div className="section-shell section-block">
          <SectionTitle eyebrow="Our promise" title="Why clients choose Rudra" center />
          <div className="value-grid">
            {values.map((value) => (
              <article className="value-card" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="section-shell section-block">
      <SectionTitle eyebrow="Menu" title="Services & pricing" center />
      <p className="section-lead">
        Transparent starting prices for everyday grooming, treatments and special
        occasion styling.
      </p>

      <div className="pricing-grid">
        {serviceCategories.map((category) => (
          <article className="pricing-card" key={category.title}>
            <img src={category.image} alt={category.title} loading="lazy" />
            <div className="pricing-content">
              <h3>{category.title}</h3>
              <ul>
                {category.items.map((item) => (
                  <li key={item.name}>
                    <span>{item.name}</span>
                    <strong>{item.price}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="center-action">
        <button className="btn btn-primary" onClick={() => onNavigate("contact")}>
          Book Your Slot
        </button>
      </div>
    </section>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  };

  return (
    <section className="section-shell contact-layout">
      <div>
        <SectionTitle eyebrow="Get in touch" title="Book your appointment" />
        <p className="contact-copy">
          Send a request and the salon team will call you back to confirm your slot.
          For quick booking, call directly.
        </p>

        <div className="contact-list">
          <a href="tel:+918172931277">+91 81729 31277</a>
          <span>Sector 104, Hajipur Gali No. 3, Noida</span>
          <span>Open daily, 8:00 AM to 10:00 PM</span>
        </div>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <Field label="Full name" name="name" placeholder="Your name" required />
          <Field label="Phone" name="phone" type="tel" placeholder="+91..." required />
        </div>
        <Field label="Email" name="email" type="email" placeholder="you@example.com" />
        <div className="form-row">
          <label>
            <span>Service</span>
            <select name="service" required defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              <option>Haircut</option>
              <option>Beard & Shave</option>
              <option>Hair Color</option>
              <option>Styling & Beauty</option>
            </select>
          </label>
          <Field label="Preferred date" name="date" type="date" required />
        </div>
        <label>
          <span>Message</span>
          <textarea
            name="message"
            rows={4}
            placeholder="Anything we should know?"
          />
        </label>
        <button className="btn btn-primary form-submit" type="submit">
          Send Booking Request
        </button>
        {sent && (
          <p className="form-success">
            Thanks. Your request is ready, and the salon can confirm by phone.
          </p>
        )}
      </form>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  center = false,
}: {
  eyebrow: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "section-title section-title-center" : "section-title"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span>{label}</span>
      <input name={name} type={type} placeholder={placeholder} required={required} />
    </label>
  );
}

export default App;
