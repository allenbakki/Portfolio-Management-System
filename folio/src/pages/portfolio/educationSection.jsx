import React from "react";
import { Form, Input, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

function EducationSection({ value = [], onChange }) {
  const addDegree = () => {
    onChange([...value, { degree: "", university: "", duration: "" }]);
  };

  const removeDegree = (index) => {
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
      {value.map((edu, index) => (
        <div key={index} style={{ borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <Form.Item label="Degree">
            <Input
              value={edu.degree}
              onChange={(e) => handleFieldChange(index, "degree", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="University">
            <Input
              value={edu.university}
              onChange={(e) => handleFieldChange(index, "university", e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Duration">
            <Input
              value={edu.duration}
              onChange={(e) => handleFieldChange(index, "duration", e.target.value)}
            />
          </Form.Item>
          <Button
            style={{ backgroundColor: "#B0B0B0", color: "white" }}
            icon={<MinusCircleOutlined />}
            onClick={() => removeDegree(index)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button
        style={{ backgroundColor: "#0D47A1", color: "white" }}
        icon={<PlusCircleOutlined />}
        onClick={addDegree}
      >
        Add Degree
      </Button>
    </Form>
  );
}

export default EducationSection;
