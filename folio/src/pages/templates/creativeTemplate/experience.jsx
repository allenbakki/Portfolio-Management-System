import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";

export default function Experience({
  collapsed,
  aboutMe = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
}) {
  const { portfolio } = useGlobalContext();

  console.log(portfolio.workExperience);
  const experienceItems =
  !portfolio?.workExperience || portfolio.workExperience.length === 0
    ? [
        {
          company: "ABC Corp",
          duration: "Jan 2021 - Dec 2022",
          description:
            "Worked on building scalable web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality features. Mentored junior developers and improved code quality standards.",
        },
        {
          company: "XYZ Solutions",
          duration: "Feb 2020 - Dec 2020",
          description:
            "Developed mobile-first responsive designs and implemented APIs. Optimized performance and contributed to UI/UX improvements. Participated in agile sprints and code reviews.",
        },
        {
          company: "TechNova",
          duration: "Jun 2018 - Jan 2020",
          description:
            "Built and maintained full-stack applications. Worked on cloud deployments and database management. Coordinated with clients to deliver customized solutions on time.",
        },
        {
          company: "Creative Studio",
          duration: "Jan 2017 - May 2018",
          description:
            "Designed and implemented front-end solutions for creative projects. Focused on responsive design, accessibility, and interactive animations.",
        },
      ]
    : portfolio.workExperience; // use the actual data if exists


  const colors = ["#99c5ff", "#ffffff"]; // original color combo

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
          Work
        </div>
        <div style={{ fontSize: "50px", fontFamily: "sans-serif" }}>
          EXPERIENCE
        </div>
        <div>{aboutMe}</div>
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

        {experienceItems.map((item, index) => (
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
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = visibleItems[index]
                ? "translateY(0) scale(1)"
                : "translateY(50px) scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
            }}
          >
            <div style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
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
            <div style={{ fontSize: 16, lineHeight: "1.6em", color: "#333" }}>
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
