import React from "react";
import { Form, Input, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function WorkExperienceSection({ value = [], onChange }) {
  const addJob = () => {
    onChange([...value, { company: "", title: "", duration: "", description: "" }]);
  };

  const removeJob = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleFieldChange = (index, field, val) => {
    const updated = [...value];
    updated[index][field] = val;
    onChange(updated);
  };

  return (
    <Form style={{ textAlign: "right" }} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
      {value.map((job, index) => (
        <div key={index} style={{ borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <Form.Item
            label="Company"
            name={["workExperience", index, "company"]}
            rules={[
              { required: true, message: "Please enter the company name" },
            ]}
          >
            <Input
              placeholder="e.g., Apple"
              value={job.company}
              onChange={(e) => handleFieldChange(index, "company", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Job Title"
            name={["workExperience", index, "title"]}
            rules={[
              { required: true, message: "Please enter your job title" },
            ]}
          >
            <Input
              placeholder="e.g., Senior Software Engineer"
              value={job.title}
              onChange={(e) => handleFieldChange(index, "title", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Duration"
            name={["workExperience", index, "duration"]}
            rules={[
              { required: true, message: "Please specify the duration of this position" },
              {
                pattern: /^[A-Za-z0-9\s–-]+$/,
                message: "Use a format such as Jan 2020 – Dec 2023'",
              },
            ]}
          >
            <Input
              placeholder="e.g., Jan 2020 – Dec 2023"
              value={job.duration}
              onChange={(e) => handleFieldChange(index, "duration", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name={["workExperience", index, "description"]}
            rules={[
              { required: true, message: "Please describe your role" },
              { max: 500, message: "Description must be under 500 characters" },
            ]}
          >
            <TextArea
              rows={5}
              showCount
              maxLength={500}
              placeholder="Describe your key role and responsabilities..."
              value={job.description}
              onChange={(e) =>
                handleFieldChange(index, "description", e.target.value)
              }
            />
          </Form.Item>
          <Button
            style={{ backgroundColor: "#B0B0B0", color: "white" }}
            icon={<MinusCircleOutlined />}
            onClick={() => removeJob(index)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        style={{ backgroundColor: "#0D47A1", color: "white" }}
        icon={<PlusCircleOutlined />}
        onClick={addJob}
      >
        Add Work Experience
      </Button>
    </Form>
  );
}

export default WorkExperienceSection;
