import { useEffect, useState } from "react";


export default function Projects({
  collapsed,
  aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}) {
  const projectItems = [
    {
      name: "Portfolio Website",
      duration: "Jan 2023 - Mar 2023",
      description:
        "Developed a personal portfolio website using React and Tailwind CSS. Implemented responsive design, interactive animations, and deployed it using Vercel.",
    },
    {
      name: "E-Commerce App",
      duration: "Apr 2023 - Jun 2023",
      description:
        "Built a full-stack e-commerce application with React, Node.js, and MongoDB. Added authentication, payment integration, and admin dashboard for product management.",
    },
    {
      name: "Blog Platform",
      duration: "Jul 2023 - Sep 2023",
      description:
        "Created a blog platform with dynamic content management. Integrated SEO optimizations and social media sharing functionalities.",
    },
    {
      name: "Task Manager",
      duration: "Oct 2023 - Nov 2023",
      description:
        "Developed a productivity web app to manage tasks and deadlines. Implemented drag-and-drop functionality and interactive UI components.",
    },
  ];

  const colors = ["#99c5ff", "#ffffff"]; // original color combo
  const [visibleItems, setVisibleItems] = useState([]);

  // Scroll fade-in effect
  useEffect(() => {
    const handleScroll = () => {
      const newVisible = projectItems.map((_, i) => {
        const el = document.getElementById(`proj-${i}`);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight - 50;
      });
      setVisibleItems(newVisible);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      {/* Section Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <div style={{ fontFamily: '"Brittany Signature", cursive', fontSize: 50 }}>
          My
        </div>
        <div style={{ fontSize: 50, fontFamily: "sans-serif" }}>PROJECTS</div>
        <div style={{ marginTop: 10 }}>{aboutMe}</div>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
          padding:10
        }}
      >
        {projectItems.map((item, index) => (
          <div
            id={`proj-${index}`}
            key={index}
            style={{
              backgroundColor: colors[index % colors.length],
              borderRadius: 15,
              padding: 20,
              boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
              transform: visibleItems[index]
                ? "translateY(0) scale(1)"
                : "translateY(50px) scale(0.95)",
              opacity: visibleItems[index] ? 1 : 0,
              transition: "all 0.5s ease-in-out",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 200,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05) translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = visibleItems[index]
                ? "translateY(0) scale(1)"
                : "translateY(50px) scale(0.95)";
              e.currentTarget.style.boxShadow = "0 3px 15px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 ,color:'black'}}>
              {item.name}
            </div>
            <div style={{ fontSize: 16, fontStyle: "italic", marginBottom: 12, color: "#555" }}>
              {item.duration}
            </div>
            <div style={{ fontSize: 16, lineHeight: "1.6em", color: "#333" }}>
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
