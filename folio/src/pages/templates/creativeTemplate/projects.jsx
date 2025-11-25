import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";

export default function Projects({
  collapsed,
  aboutMe = "Here’s a quick overview of the projects I have worked on.",
}) {
  const { portfolio,accessToken } = useGlobalContext();


  const projectItems = Array.isArray(portfolio?.portfolio?.projects)
    ? portfolio.portfolio.projects
    : [];

  const colors = ["#99c5ff", "#ffffff"];
  const [visibleItems, setVisibleItems] = useState([]);


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
  }, [accessToken]);

  return (
    <div style={{ padding: 20 }}>

      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{ fontFamily: '"Brittany Signature", cursive', fontSize: 50 }}
        >
          My
        </div>
        <div style={{ fontSize: 50, fontFamily: "sans-serif" }}>PROJECTS</div>
        <div style={{ marginTop: 10 }}>{aboutMe}</div>
      </div>

      {projectItems.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: 30,
            fontSize: 18,
            color: "#777",
          }}
        >
          No projects added yet.
        </div>
      ) : (

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
            padding: 10,
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
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = visibleItems[index]
                  ? "translateY(0) scale(1)"
                  : "translateY(50px) scale(0.95)";
                e.currentTarget.style.boxShadow =
                  "0 3px 15px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 8,
                  color: "black",
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  fontSize: 16,
                  fontStyle: "italic",
                  marginBottom: 12,
                  color: "#555",
                }}
              >
                {item.link || item.timeline || "View Details"}
              </div>

              <div
                style={{ fontSize: 16, lineHeight: "1.6em", color: "#333" }}
              >
                {item.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
