import { Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import { useStoreContext } from "@/context/store-context";

const footerLinks = {
  Shop: ["By Age", "Educational", "Outdoor", "New Arrivals", "Best Sellers", "STEM Toys"],
  Support: ["Contact Us", "Shipping Info", "Returns & Exchanges", "FAQ", "Size Guide"],
  Company: ["About Us", "Our Story", "Careers", "Press"],
};

export default function SiteFooter() {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footerSection' }, '*');
    }
  };

  const brandName = customization?.footer?.brandName || "Play-Well";
  const description = customization?.footer?.description || "Thoughtfully designed toys that spark creativity and make learning fun.";
  const copyright = customization?.footer?.copyright || `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;

  return (
    <footer
      className="bg-foreground text-card pt-12 pb-6 cursor-pointer"
      onClick={handleSectionClick}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-display text-xl font-extrabold mb-3">
              {brandName}
            </h3>
            <p className="font-body text-sm text-card/60 mb-4">
              {description}
            </p>
            <div className="flex gap-3">
              <Link href="#" className="p-2 bg-card/10 rounded-full hover:bg-card/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-card/10 rounded-full hover:bg-card/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 bg-card/10 rounded-full hover:bg-card/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="font-body text-sm text-card/60 hover:text-card transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-card/10 pt-6 text-center">
          <p className="font-body text-xs text-card/40">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}


