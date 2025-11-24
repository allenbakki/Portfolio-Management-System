import React from "react";
import { Form, Input, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

function EducationSection({ value = [], onChange }) {
  const addDegree = () =>
    onChange([...value, { degree: "", university: "", duration: "" }]);

  const removeDegree = (index) =>
    onChange(value.filter((_, i) => i !== index));

  const updateField = (index, field, val) => {
    const updated = [...value];
    updated[index][field] = val;
    onChange(updated);
  };

  return (
    <div style={{ textAlign: "right" }}>
      {value.map((edu, index) => (
        <div
          key={index}
          style={{
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <Form.Item label="Degree">
            <Input
              placeholder="e.g., B.S. Computer Science"
              value={edu.degree}
              onChange={(e) => updateField(index, "degree", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="University">
            <Input
              placeholder="e.g., Saint Louis University"
              value={edu.university}
              onChange={(e) => updateField(index, "university", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Duration">
            <Input
              placeholder="e.g., Aug 2020 – May 2024"
              value={edu.duration}
              onChange={(e) => updateField(index, "duration", e.target.value)}
            />
          </Form.Item>

          <Button
            danger
            icon={<MinusCircleOutlined />}
            onClick={() => removeDegree(index)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={addDegree}
      >
        Add Degree
      </Button>
    </div>
  );
}

export default EducationSection;
