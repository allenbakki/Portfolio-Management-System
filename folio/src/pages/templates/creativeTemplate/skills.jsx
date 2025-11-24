import { useEffect, useState } from "react";
import womenImg from "./assests/women.png";
import graphicDesign from "./assests/graphicDesign.png";
import webDesign from "./assests/webDesign.png";
import illustration from "./assests/illustration.png";
import photography from "./assests/photography.png";

export default function Skills({
  collapsed,
  aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}) {
  const skillItems = [
    { img: photography, label: "Photography" },
    { img: graphicDesign, label: "Graphic Design" },
    { img: webDesign, label: "Web Design" },
    { img: illustration, label: "Illustration" },
  ];

  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const newVisible = skillItems.map((_, i) => {
        const el = document.getElementById(`skill-${i}`);
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
          Skills
        </div>
        <div>{aboutMe}</div>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
          maxWidth: 700,
        }}
      >
        {skillItems.map((item, index) => (
          <div
            id={`skill-${index}`}
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              transform: visibleItems[index]
                ? "translateY(0) scale(1)"
                : "translateY(50px) scale(0.95)",
              opacity: visibleItems[index] ? 1 : 0,
              transition: "all 0.6s ease-in-out",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05) translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = visibleItems[index]
                ? "translateY(0) scale(1)"
                : "translateY(50px) scale(0.95)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={item.img}
              alt={item.label}
              style={{
                width: "100%",
                maxWidth: 400,
                height: 180,
                border: "2px solid #fffaef",
                borderRadius: 6,
                objectFit: "cover",
                transition: "all 0.3s ease-in-out",
              }}
            />
            <div
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 5,
                transition: "color 0.3s",
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
