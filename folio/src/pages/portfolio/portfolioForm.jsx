import { Form, Input } from "antd";
import EducationSection from "./educationSection";
import WorkExperienceSection from "./workExperienceSection";
import ProjectSection from "./projectsSection";
import { useState } from "react";
import { portfolioDetails } from "../../apis/api";

const { TextArea } = Input;

function PortfolioForm() {
  const [PortfolioFormDetails, setPortfolioFormDetails] = useState({
    general: {
      name: "",
      professionalTitle: "",
      email: "",
      aboutMe: "",
      linkedIn: "",
      location: "",
    },
    workExperience: [],
    education: [],
    projects: [],
  });

  const handleGeneralChange = (field) => (e) => {
    setPortfolioFormDetails((prev) => ({
      ...prev,
      general: { ...prev.general, [field]: e.target.value },
    }));
  };

  const handleWorkChange = (workArray) => {
    setPortfolioFormDetails((prev) => ({ ...prev, workExperience: workArray }));
  };

  const handleEducationChange = (eduArray) => {
    setPortfolioFormDetails((prev) => ({ ...prev, education: eduArray }));
  };

  const handleProjectChange = (projArray) => {
    setPortfolioFormDetails((prev) => ({ ...prev, projects: projArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    portfolioDetails(PortfolioFormDetails)
      .then((response) => {
        if (response.status === 200) {
          console.log("Submitted successfully");
        }
      })
      .catch((error) => {
        console.error("Error submitting:", error);
      });
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onSubmitCapture={handleSubmit}
    >
      <h2>General</h2>
      <Form.Item label="Name">
        <Input onChange={handleGeneralChange("name")} />
      </Form.Item>
      <Form.Item label="Professional Title">
        <Input onChange={handleGeneralChange("professionalTitle")} />
      </Form.Item>
      <Form.Item label="Email">
        <Input onChange={handleGeneralChange("email")} />
      </Form.Item>
      <Form.Item label="Location">
        <Input onChange={handleGeneralChange("location")} />
      </Form.Item>
      <Form.Item label="LinkedIn">
        <Input onChange={handleGeneralChange("linkedIn")} />
      </Form.Item>
      <Form.Item label="About Me">
        <TextArea
          rows={10}
          showCount
          maxLength={500}
          onChange={handleGeneralChange("aboutMe")}
        />
      </Form.Item>

      <h2>Work Experience</h2>
      <WorkExperienceSection
        value={PortfolioFormDetails.workExperience}
        onChange={handleWorkChange}
      />

      <h2>Education</h2>
      <EducationSection
        value={PortfolioFormDetails.education}
        onChange={handleEducationChange}
      />

      <h2>Projects</h2>
      <ProjectSection
        value={PortfolioFormDetails.projects}
        onChange={handleProjectChange}
      />

      <div
        style={{
          paddingBottom: "8px",
          display: "flex",
          justifyContent: "center",
          paddingTop: 12,
        }}
      >
        <button
          type="submit"
          className="btn"
          style={{
            width: "200px",
            color: "white",
            backgroundColor: "green",
            outline: "none",
          }}
        >
          Submit
        </button>
      </div>
    </Form>
  );
}

export default PortfolioForm;
