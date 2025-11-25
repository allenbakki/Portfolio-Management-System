import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import womenImg from "../creativeTemplate/assests/women.png";

export default function AboutMe({ collapsed, portfolio }) {
  // portfolio shape is: { success: true, portfolio: { general: { ... } } }
  const general = portfolio?.portfolio?.general || {};

  // If portfolio hasn't loaded yet, don't crash
  if (!portfolio || !portfolio.portfolio) {
    return (
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: 20,
        padding: 20,
      }}
    >
      {/* Text Section */}
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
            opacity: 0,
            animation: "fadeInUp 1s forwards",
          }}
        >
          Introducing
        </div>
        <div
          style={{
            fontSize: "50px",
            fontFamily: "sans-serif",
            opacity: 0,
            animation: "fadeInUp 1s 0.3s forwards",
          }}
        >
          ABOUT ME
        </div>
        <div
          style={{
            opacity: 0,
            animation: "fadeInUp 1s 0.6s forwards",
          }}
        >
          {general.aboutMe || ""}
        </div>

        {/* Contact Info */}
        <div
          style={{
            display: "flex",
            gap: 15,
            marginTop: 20,
            opacity: 0,
            animation: "fadeInUp 1s 0.9s forwards",
          }}
        >
          {general.linkedIn && (
            <a
              href={`https://linkedin.com/in/${general.linkedIn}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={28} />
            </a>
          )}
          {general.email && (
            <a href={`mailto:${general.email}`}>
              <FaEnvelope size={28} />
            </a>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          transition: "transform 0.5s ease",
        }}
      >
        <img
          src={womenImg}
          alt="Profile"
          style={{
            border: "2px solid #fffaef",
            borderRadius: "6px",
            width: "100%",
            maxWidth: 600,
            height: "auto",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        <div style={{ fontWeight: "bold", fontSize: 30 }}>
          {general.name}
        </div>
        <div style={{ fontSize: 22 }}>{general.professionalTitle}</div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
