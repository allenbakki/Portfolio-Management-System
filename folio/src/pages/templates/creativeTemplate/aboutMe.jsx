import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import womenImg from "../creativeTemplate/assests/women.png";
import { useGlobalContext } from "../../../context/GlobalContext";

export default function AboutMe({ collapsed }) {
  const {portfolio}=useGlobalContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
          {portfolio.portfolio.general?.aboutMe || "Hi, I'm Reshma a software developer from Hyderabad, India, with over 2 years of experience in software development. I specialize in building scalable and efficient applications, and i enjoy working on challenging projects that help me grow my skills. I am passionate about learning new technologies and constantly improving my craft to deliver high quality solutions."}
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
          <a href="https://github.com/reshma" target="_blank">
            <FaGithub size={28} />
          </a>
          <a href="https://linkedin.com/in/reshma" target="_blank">
            <FaLinkedin size={28} />
          </a>
          <a href="mailto:reshma@example.com">
            <FaEnvelope size={28} />
          </a>
          <a href="tel:+911234567890">
            <FaPhone size={28} />
          </a>
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

        <div style={{ fontWeight: "bold", fontSize: 30 }}>{portfolio.portfolio.general.name}</div>
        <div style={{ fontSize: 22 }}>{portfolio.portfolio.general.professionalTitle}</div>
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
