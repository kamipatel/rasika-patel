import { Home, User, Briefcase, Wrench, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export default function PortfolioNav({ activeNav }) {
  // Map internal section IDs to display names expected by the navbar
  const getDisplayName = (id) => {
    switch (id) {
      case "hero": return "Home";
      case "about": return "About";
      case "work": return "Work";
      case "skills": return "Skills";
      case "contact": return "Contact";
      default: return "Home";
    }
  };

  const navItems = [
    { name: "Home", url: "#hero", icon: Home },
    { name: "About", url: "#about", icon: User },
    { name: "Work", url: "#work", icon: Briefcase },
    { name: "Skills", url: "#skills", icon: Wrench },
    { name: "Contact", url: "#contact", icon: Mail },
  ];

  return <NavBar items={navItems} activeTab={getDisplayName(activeNav)} />;
}
