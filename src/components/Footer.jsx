import React from "react";
import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Me" },
  { to: "/photography", label: "Photography" },
  { to: "/booking", label: "Bookings" },
  { to: "/contact", label: "Contact" },
];

const SOCIALS = [
  {
    href: "https://www.facebook.com/maireadssecretsofflowers/photos_by",
    icon: "fa-brands fa-facebook",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/mysecretsofflowers/",
    icon: "fa-brands fa-instagram",
    label: "Instagram",
  },
];

export default function Footer() {
  return (
    <footer className="bg-sage-800 text-cream-100">
      <div className="mx-auto max-w-page px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* About */}
          <div>
            <h3 className="font-Italianno text-4xl text-white leading-none">
              Secrets of Flowers
            </h3>
            <p className="mt-4 text-cream-100/80 leading-relaxed max-w-sm">
              Bringing creativity to life through vibrant colours and captivating
              botanical photography.
            </p>
            <div className="mt-5 flex gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <i className={`${s.icon} text-base`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-base uppercase tracking-[0.18em] mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-cream-100/80 hover:text-white transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-base uppercase tracking-[0.18em] mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-cream-100/80">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot mt-1 text-sage-300" />
                <span>Tralee, Co. Kerry, Ireland</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-envelope mt-1 text-sage-300" />
                <a
                  href="mailto:mairead@secretsofflowers.com"
                  className="hover:text-white transition"
                >
                  mairead@secretsofflowers.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center md:justify-between gap-3 text-sm text-cream-100/70">
          <p>© {new Date().getFullYear()} Secrets of Flowers. All rights reserved.</p>
          <p>
            Designed &amp; developed by{" "}
            <a
              href="https://daranewso.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cream-100 font-semibold"
            >
              Dara Newsome
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
