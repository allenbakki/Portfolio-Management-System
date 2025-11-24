import visionBoard from "./assests/visionBoard.png";
import vision from "./assests/vision.png";

export default function Vision({
  collapsed,
  aboutMe = "Hi, I’m Reshma, a software developer from Hyderabad, India, with over 2 years of experience in software development. I specialize in building scalable and efficient applications, and I enjoy working on challenging projects that help me grow my skills. I am passionate about learning new technologies and constantly improving my craft to deliver high-quality solutions.",
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "left",
          width: "100%",
          maxWidth: 400,
          padding: 10,
          backgroundColor: "#99c5ff",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            maxWidth: 500,
            height: "auto",
            borderRadius: 6,
            overflow: "hidden", 
          }}
        >
          <img
            src={visionBoard}
            alt="Vision Board"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              color: "black",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: 44 }}>VISION</div>
            <div style={{ fontSize: 16,fontFamily:"sans-serif" }}>
              Empower innovation through technology. Deliver impactful solutions
              with creativity. Foster growth and learning in every project.
              Inspire positive change in communities we serve.
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "Column",
          alignItems: "center",
        }}
      >
        <img
          src={vision}
          style={{
            border: "2px solid #fffaef",
            borderRadius: "10px",
            width: "100%",
            maxWidth: 600,
            height: "auto",
          }}
        />
      </div>
    </div>
  );
}
