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
          <Form.Item
            label="Degree"
            name={["education", index, "degree"]}
            rules={[
              { required: true, message: "Please enter your degree" },
              { max: 100, message: "Degree title must be under 100 characters" },
            ]}
          >
            <Input
              placeholder="e.g., Bachelor of Science in Computer Science"
              value={edu.degree}
              onChange={(e) => handleFieldChange(index, "degree", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="University"
            name={["education", index, "university"]}
            rules={[
              { required: true, message: "Please enter the name of your university" },
              { max: 100, message: "University name must be under 100 characters" },
            ]}
          >
            <Input
              placeholder="e.g., Saint Louis University"
              value={edu.university}
              onChange={(e) => handleFieldChange(index, "university", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Duration"
            name={["education", index, "duration"]}
            rules={[
              { required: true, message: "Please specify the duration of your degree program" },
              {
                pattern: /^[A-Za-z0-9\s–-]+$/,
                message: "Use a format such as Aug 2020 – May 2024",
              },
            ]}
          >
            <Input
              placeholder="e.g., Aug 2020 – May 2024"
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
