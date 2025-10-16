import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

function EducationSection() {
  const [numDegrees, setNumDegrees] = useState(0);

  function addDegree() {
    setNumDegrees(numDegrees + 1);
  }

  function removeDegree() {
    if (numDegrees > 0) {
      setNumDegrees(numDegrees - 1);
    }
  }

  const degreeEntries = [];
  for (let i = 0; i < numDegrees; i++) {
    degreeEntries.push(
      <div style={{
           borderRadius: 8,
           padding: 16,
           marginBottom: 16}}>
        <Form.Item label="Degree"
                   name="Degree">
            <Input />
        </Form.Item>
        <Form.Item label="Univeristy"
                   name="University">
            <Input />
        </Form.Item>
        <Form.Item label="Duration"
                   name="Duration">
            <Input />
        </Form.Item>
        <Button style={{ backgroundColor: "#B0B0B0", 
                color: "white" }}
                icon={<MinusCircleOutlined />}
                onClick={removeDegree}>
          Remove
        </Button>
      </div>
    );
  }

  return (
    <Form style={{textAlign: "right"}}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}>
      {degreeEntries}
      <Button style={{ backgroundColor: "#0D47A1", 
              color: "white" }} 
              icon={<PlusCircleOutlined />} 
              onClick={addDegree}>
        Add Degree
      </Button>
    </Form>
  );
}

export default EducationSection;
