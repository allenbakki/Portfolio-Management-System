import { Form, Input } from "antd";
import EducationSection from "./educationSection";
import WorkExperienceSection from "./workExperienceSection";
import ProjectSection from "./projectsSection";
import { useState, useEffect } from "react";
import { portfolioDetails } from "../../apis/api";
import { useGlobalContext } from "../../context/GlobalContext";
import { getPortfolio } from "../../apis/getPortfolio";

const { TextArea } = Input;

function PortfolioForm() {
  const { accessToken } = useGlobalContext();
  const [form] = Form.useForm();

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
    const value = e.target.value;
    setPortfolioFormDetails((prev) => ({
      ...prev,
      general: { ...prev.general, [field]: value },
    }));
    form.setFieldsValue({ [field]: value });
  };

  const handleWorkChange = (workArray) => {
    setPortfolioFormDetails((prev) => ({
      ...prev,
      workExperience: workArray,
    }));
  };

  const handleEducationChange = (eduArray) => {
    setPortfolioFormDetails((prev) => ({
      ...prev,
      education: eduArray,
    }));
  };

  const handleProjectChange = (projArray) => {
    setPortfolioFormDetails((prev) => ({
      ...prev,
      projects: projArray,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleaned = {
      ...PortfolioFormDetails,
      workExperience: PortfolioFormDetails.workExperience.filter(
        (w) => w.company || w.title || w.duration || w.description
      ),
      education: PortfolioFormDetails.education.filter(
        (e) => e.degree || e.university || e.duration
      ),
      projects: PortfolioFormDetails.projects.filter(
        (p) => p.title || p.description || p.link
      ),
    };

    portfolioDetails(cleaned, accessToken)
      .then((response) => {
        if (response.status === 200) {
          console.log("Submitted successfully");
        }
      })
      .catch((error) => console.error("Error submitting:", error));
  };

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const response = await getPortfolio(accessToken);
        const p = response?.portfolio;

        if (!p) return;

        setPortfolioFormDetails({
          general: p.general || {},
          workExperience: p.workExperience || [],
          education: p.education || [],
          projects: p.projects || [],
        });

        form.setFieldsValue({
          name: p.general?.name,
          professionalTitle: p.general?.professionalTitle,
          email: p.general?.email,
          aboutMe: p.general?.aboutMe,
          linkedIn: p.general?.linkedIn,
          location: p.general?.location,
        });

      } catch (err) {
        console.error("Error loading portfolio:", err);
      }
    }

    loadPortfolio();
  }, [accessToken, form]);

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onSubmitCapture={handleSubmit}
    >
      <h2>General</h2>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ 
          required: true, 
          message: "Please enter your full name" 
        }]}
      >
        <Input
          value={PortfolioFormDetails.general.name}
          onChange={handleGeneralChange("name")}
        />
      </Form.Item>

      <Form.Item
        label="Professional Title"
        name="professionalTitle"
        rules={[{ required: true, message: "Please enter your professional title" }]}
      >
        <Input
          value={PortfolioFormDetails.general.professionalTitle}
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
          value={PortfolioFormDetails.general.email}
          onChange={handleGeneralChange("email")}
        />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "Please enter your location" }]}
      >
        <Input
          value={PortfolioFormDetails.general.location}
          onChange={handleGeneralChange("location")}
        />
      </Form.Item>

      <Form.Item
        label="LinkedIn"
        name="linkedIn"
        rules={[
          { required: true, message: "Please enter a valid LinkedIn handle" }
        ]}
      >
        <Input
          value={PortfolioFormDetails.general.linkedIn}
          onChange={handleGeneralChange("linkedIn")}
        />
      </Form.Item>

      <Form.Item
        label="About Me"
        name="aboutMe"
        rules={[
          { required: true, message: "Please write a short description about yourself" },
          { max: 500, message: "About Me must be under 500 characters" },
        ]}
      >
        <TextArea
          rows={10}
          showCount
          maxLength={500}
          value={PortfolioFormDetails.general.aboutMe}
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
          }}
        >
          Save Portfolio
        </button>
      </div>
    </Form>
  );
}

export default PortfolioForm;
