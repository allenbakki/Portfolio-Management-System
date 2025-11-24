import React from "react";
import { Form, Input, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function ProjectSection({ value = [], onChange }) {
  const addProject = () =>
    onChange([...value, { title: "", description: "", link: "" }]);

  const removeProject = (index) =>
    onChange(value.filter((_, i) => i !== index));

  const updateField = (index, field, val) => {
    const updated = [...value];
    updated[index][field] = val;
    onChange(updated);
  };

  return (
    <div style={{ textAlign: "right" }}>
      {value.map((proj, index) => (
        <div
          key={index}
          style={{
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <Form.Item label="Project Title">
            <Input
              placeholder="e.g., Machine Learning for Market Analysis"
              value={proj.title}
              onChange={(e) => updateField(index, "title", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Description">
            <TextArea
              rows={5}
              showCount
              maxLength={500}
              placeholder="Describe your project..."
              value={proj.description}
              onChange={(e) =>
                updateField(index, "description", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item label="Link">
            <Input
              placeholder="https://github.com"
              value={proj.link}
              onChange={(e) => updateField(index, "link", e.target.value)}
            />
          </Form.Item>
      
          <Button
            danger
            icon={<MinusCircleOutlined />}
            onClick={() => removeProject(index)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={addProject}
      >
        Add Project
      </Button>
    </div>
  );
}

export default ProjectSection;
