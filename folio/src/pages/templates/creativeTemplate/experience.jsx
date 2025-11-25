import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";

export default function Experience({
  collapsed,
}) {
  const { portfolio } = useGlobalContext();

  const experienceItems = Array.isArray(portfolio?.workExperience)
    ? portfolio.workExperience
    : [];

  const colors = ["#99c5ff", "#ffffff"];

  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const newVisible = experienceItems.map((_, i) => {
        const el = document.getElementById(`exp-${i}`);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight - 50;
      });
      setVisibleItems(newVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [experienceItems]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: 20,
        padding: 20,
      }}
    >
      {/* Left Side */}
      <div
        style={{
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontFamily: '"Brittany Signature", cursive',
            fontSize: "50px",
          }}
        >
          Work
        </div>
        <div style={{ fontSize: "50px", fontFamily: "sans-serif" }}>
          EXPERIENCE
        </div>
       
      </div>

      {/* Right Side */}
      <div
        style={{
          maxWidth: 700,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          maxHeight: 500,
          overflowY: "auto",
          padding: 10,
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              width: 0px;
              background: transparent;
            }
          `}
        </style>

        {/* 🔥 Handle empty experience */}
        {experienceItems.length === 0 && (
          <div style={{ fontSize: 18, color: "#777", padding: 20 }}>
            No experience added yet.
          </div>
        )}

        {/* Render experiences */}
        {experienceItems.length > 0 &&
          experienceItems.map((item, index) => (
            <div
              id={`exp-${index}`}
              key={index}
              style={{
                backgroundColor: colors[index % colors.length],
                borderRadius: 10,
                padding: 20,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transform: visibleItems[index]
                  ? "translateY(0)"
                  : "translateY(50px)",
                opacity: visibleItems[index] ? 1 : 0,
                transition: "all 0.6s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = visibleItems[index]
                  ? "translateY(0) scale(1)"
                  : "translateY(50px) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.1)";
              }}
            >
              <div
                style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
              >
                {item.company}
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontStyle: "italic",
                  marginBottom: 10,
                  color: "#555",
                }}
              >
                {item.duration}
              </div>
              <div
                style={{ fontSize: 16, lineHeight: "1.6em", color: "#333" }}
              >
                {item.description}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
