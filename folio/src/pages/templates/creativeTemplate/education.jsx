import { useEffect, useState } from "react";
import { BookOutlined, LaptopOutlined, ReadOutlined } from "@ant-design/icons";
import { useGlobalContext } from "../../../context/GlobalContext";

export default function Education({
  aboutMe = "Here’s a summary of my academic journey and milestones.",
}) {
  const { portfolio ,accessToken} = useGlobalContext();

  // Safe extraction of education items
  const educationItems = Array.isArray(portfolio?.education)
    ? portfolio.education
    : [];

  const colors = ["#99c5ff", "#ffffff"];
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const newVisible = educationItems.map((_, i) => {
        const el = document.getElementById(`edu-${i}`);
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
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            fontFamily: '"Brittany Signature", cursive',
            fontSize: "50px",
          }}
        >
          My
        </div>
        <div style={{ fontSize: "50px", fontFamily: "sans-serif" }}>
          EDUCATION
        </div>
        <div style={{ marginTop: 10 }}>{aboutMe}</div>
      </div>

      {/* Timeline Container */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: 900,
          margin: "0 auto",
          gap: 40,
        }}
      >
        {/* Vertical Line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 4,
            backgroundColor: "gray",
            transform: "translateX(-50%)",
          }}
        />

        {/* If empty — show fallback */}
        {educationItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: 30,
              fontSize: 18,
              color: "#777",
            }}
          >
            No education details added yet.
          </div>
        ) : (
          educationItems.map((item, index) => (
            <div
              key={index}
              id={`edu-${index}`}
              style={{
                display: "flex",
                justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                alignItems: "center",
                opacity: visibleItems[index] ? 1 : 0,
                transform: visibleItems[index]
                  ? "translateX(0)"
                  : index % 2 === 0
                  ? "translateX(-50px)"
                  : "translateX(50px)",
                transition: "all 0.6s ease-in-out",
              }}
            >
              <div
                style={{
                  backgroundColor: colors[index % colors.length],
                  padding: 20,
                  borderRadius: 12,
                  width: "40%",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  position: "relative",
                }}
              >
                {/* Icon: If your backend sends icons, use it. Otherwise fallback. */}
                <div
                  style={{
                    position: "absolute",
                    top: -20,
                    left: index % 2 === 0 ? -40 : "auto",
                    right: index % 2 !== 0 ? -40 : "auto",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    padding: 10,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  {item.icon ? (
                    item.icon
                  ) : (
                    <BookOutlined style={{ fontSize: 30, color: "#ff6f61" }} />
                  )}
                </div>

                <div
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {item.degree}
                </div>

                <div
                  style={{
                    fontSize: 16,
                    fontStyle: "italic",
                    marginBottom: 10,
                    color: "#555",
                  }}
                >
                  {item.university} | {item.duration}
                </div>

                <div
                  style={{
                    fontSize: 16,
                    lineHeight: "1.5em",
                    color: "#333",
                  }}
                >
                  {item.description}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
