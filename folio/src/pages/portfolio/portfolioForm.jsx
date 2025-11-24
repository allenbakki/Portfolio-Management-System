import { Form, Input } from "antd";
import EducationSection from "./educationSection";
import WorkExperienceSection from "./workExperienceSection";
import ProjectSection from "./projectsSection";
import { useState, useEffect } from "react";
import { portfolioDetails } from "../../apis/api";
import {useGlobalContext} from "../../context/GlobalContext"
import { getPortfolio } from "../../apis/getPortfolio";

const { TextArea } = Input;

function PortfolioForm() {
  const { accessToken } = useGlobalContext();
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
    portfolioDetails(PortfolioFormDetails,accessToken)
      .then((response) => {
        if (response.status === 200) {
          console.log("Submitted successfully");
        }
      })
      .catch((error) => {
        console.error("Error submitting:", error);
      });
  };

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await getPortfolio(accessToken);
        console.log("Portfolio response:", data); 

      } catch (err) {
        console.error("Error loading portfolio:", err);
      }
    }

    loadPortfolio();
  }, []);


  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onSubmitCapture={handleSubmit}
    >
      <h2>General</h2>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please enter your full name" },
        ]}
      >
        <Input
          placeholder="e.g., Jane Doe"
          onChange={handleGeneralChange("name")}
        />
      </Form.Item>

      <Form.Item
        label="Professional Title"
        name="professionalTitle"
        rules={[
          { required: true, message: "Please enter your professional title" },
        ]}
      >
        <Input
          placeholder="e.g., Aerospace Engineer"
          onChange={handleGeneralChange("professionalTitle")}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email address" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input
          placeholder="e.g., jane.doe@email.com"
          onChange={handleGeneralChange("email")}
        />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[
          { required: true, message: "Please enter your location" },
        ]}
      >
        <Input
          placeholder="e.g., St. Louis, MO"
          onChange={handleGeneralChange("location")}
        />
      </Form.Item>

      <Form.Item
        label="LinkedIn"
        name="linkedIn"
        rules={[
          { required: true, message: "Please enter a valid LinkedIn handle" },
          {
            pattern: /^[a-zA-Z0-9-]+$/,
            message: "Only letters, numbers, and hyphens are allowed",
          },
        ]}
      >
        <Input
          placeholder="e.g., jane-doe"
          onChange={handleGeneralChange("linkedIn")}
        />
      </Form.Item>

      <Form.Item
        label="About Me"
        name="aboutMe"
        rules={[
          { required: true, message: "Please write a short description about yourself" },
          { max: 500, message: "About Me section must be under 500 characters" },
        ]}
      >
        <TextArea
          rows={10}
          showCount
          maxLength={500}
          placeholder="Write a short introduction about your background, interests, and career goals..."
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
