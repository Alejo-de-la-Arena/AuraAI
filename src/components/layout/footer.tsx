import { Twitter, Linkedin, Github } from 'lucide-react';

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: ['Features', 'Integrations', 'Templates', 'Pricing', 'Changelog', 'API Docs'],
  },
  {
    title: 'Company',
    links: ['About', 'Customers', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API Reference', 'Status', 'Community', 'Blog'],
  },
  {
    title: 'Legal',
    links: ['Terms of Service', 'Privacy Policy', 'Security', 'DPA', 'Cookie Settings'],
  },
];

const SOCIALS = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-aura-700 pt-16 pb-12 bg-aura-950">
      <div className="max-w-container mx-auto px-6">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <p className="text-body font-bold text-zinc-50 mb-3">
              AURA <span className="text-cyan-aura">AI</span>
            </p>
            <p className="text-small text-zinc-500 mb-6 max-w-[200px]">
              Enterprise AI integration. Built for teams without a ML team.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-aura-800 border border-aura-700 flex items-center justify-center text-zinc-500 hover:text-zinc-50 hover:border-aura-600 transition-all duration-150"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-small font-semibold text-zinc-50 mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="link-underline text-small text-zinc-500 hover:text-zinc-300 transition-colors duration-150"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-aura-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-small text-zinc-600">© 2026 AURA AI, Inc. All rights reserved.</p>
            <a
              href="#"
              className="cursor-pointer transition-opacity duration-150 hover:opacity-100"
              style={{
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: '#00E5FF',
                opacity: 0.6,
              }}
            >
              Developed by VYZON
            </a>
          </div>
          <button className="text-small text-zinc-600 hover:text-zinc-400 transition-colors duration-150">
            English (US) ↗
          </button>
        </div>
      </div>
    </footer>
  );
}
