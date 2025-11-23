import React from "react";
import { Form, Input, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function ProjectSection({ value = [], onChange }) {
  const addProject = () => {
    onChange([...value, { title: "", description: "", link: "" }]);
  };

  const removeProject = (index) => {
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
      {value.map((proj, index) => (
        <div key={index} style={{ borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <Form.Item
            label="Project Title"
            name={["projects", index, "title"]}
            rules={[
              { required: true },
              {
                max: 100,
                message: "Title must be under 100 characters",
              },
            ]}
          >
            <Input
              placeholder="e.g., Using Machine Learning for Product Pricing"
              value={proj.title}
              onChange={(e) => handleFieldChange(index, "title", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name={["projects", index, "description"]}
            rules={[
              { required: true }, 
              {
                max: 500,
                message: "Project description must be under 500 characters",
              },
            ]}
          >
            <TextArea
              rows={5}
              showCount
              maxLength={500}
              placeholder="Describe your project and its impact..."
              value={proj.description}
              onChange={(e) => handleFieldChange(index, "description", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Link"
            name={["projects", index, "link"]}
            rules={[
              {
                type: "url",
                message: "Please enter a valid URL",
              },
              {
                required: true,
                message: "Please provide a link to your project",
              },
            ]}
          >
            <Input
              value={proj.link}
              onChange={(e) => handleFieldChange(index, "link", e.target.value)}
            />
          </Form.Item>
          <Button
            style={{ backgroundColor: "#B0B0B0", color: "white" }}
            icon={<MinusCircleOutlined />}
            onClick={() => removeProject(index)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        style={{ backgroundColor: "#0D47A1", color: "white" }}
        icon={<PlusCircleOutlined />}
        onClick={addProject}
      >
        Add Project
      </Button>
    </Form>
  );
}

export default ProjectSection;
