import React from "react";
import { Form, Input, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function WorkExperienceSection({ value = [], onChange }) {
  const addJob = () => {
    onChange([
      ...value, { 
        company: "", 
        title: "", 
        duration: "", 
        description: "" 
      },
    ]);
  };

  const removeJob = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateField = (index, field, val) => {
    const updated = [...value];
    updated[index][field] = val;
    onChange(updated);
  };

  return (
    <div style={{ textAlign: "right" }}>
      {value.map((job, index) => (
        <div
          key={index}
          style={{
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <Form.Item label="Company">
            <Input
              placeholder="e.g., Apple"
              value={job.company}
              onChange={(e) => updateField(index, "company", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Job Title">
            <Input
              placeholder="e.g., Senior Software Engineer"
              value={job.title}
              onChange={(e) => updateField(index, "title", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Duration">
            <Input
              placeholder="e.g., Jan 2020 – Dec 2023"
              value={job.duration}
              onChange={(e) => updateField(index, "duration", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Description">
            <TextArea
              rows={5}
              showCount
              maxLength={500}
              placeholder="Describe your role..."
              value={job.description}
              onChange={(e) =>
                updateField(index, "description", e.target.value)
              }
            />
          </Form.Item>

          <Button
            danger
            icon={<MinusCircleOutlined />}
            onClick={() => removeJob(index)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={addJob}
      >
        Add Work Experience
      </Button>
    </div>
  );
}

export default WorkExperienceSection;
