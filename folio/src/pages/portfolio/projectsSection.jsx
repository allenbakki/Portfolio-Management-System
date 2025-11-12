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
          <Form.Item label="Project Title">
            <Input
              value={proj.title}
              onChange={(e) => handleFieldChange(index, "title", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description">
            <TextArea
              rows={5}
              showCount
              maxLength={500}
              value={proj.description}
              onChange={(e) => handleFieldChange(index, "description", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Link">
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
