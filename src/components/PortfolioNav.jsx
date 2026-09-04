import { Home, User, Briefcase, Wrench, Mail, FileText } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NavBar } from "@/components/ui/tubelight-navbar";

export default function PortfolioNav({ activeNav }) {
  const location = useLocation();

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
    { name: "Home", url: "/#hero", icon: Home },
    { name: "About", url: "/#about", icon: User },
    { name: "Work", url: "/#work", icon: Briefcase },
    { name: "Skills", url: "/#skills", icon: Wrench },
    { name: "Contact", url: "/#contact", icon: Mail },
    { name: "Resume", url: "/resume", icon: FileText },
  ];

  // Route pages own the active state; section tracking only applies on home
  const activeTab =
    location.pathname === "/resume" ? "Resume" : getDisplayName(activeNav);

  return <NavBar items={navItems} activeTab={activeTab} />;
}
