import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function WorkExperienceSection() {
  const [numJobs, setNumJobs] = useState(0);

  function addJob() {
    setNumJobs(numJobs + 1);
  }

  function removeJob() {
    if (numJobs > 0) {
      setNumJobs(numJobs - 1);
    }
  }

  const jobEntries = [];
  for (let i = 0; i < numJobs; i++) {
    jobEntries.push(
      <div style={{
           borderRadius: 8,
           padding: 16,
           marginBottom: 16}}>
        <Form.Item label="Company"
                   name="Company">
            <Input />
        </Form.Item>
        <Form.Item label="Job Title"
                   name="Job Title">
            <Input />
        </Form.Item>
        <Form.Item label="Duration"
                   name="Duration">
            <Input />
        </Form.Item>
        <Form.Item label="Description"
                   name="Description">
        <TextArea rows={5} 
                  showCount
                  maxLength={500}/>
        </Form.Item>
        <Button style={{ backgroundColor: "#B0B0B0", 
                         color: "white" }}
                icon={<MinusCircleOutlined />}
                onClick={removeJob}>
          Remove
        </Button>
      </div>
    );
  }

  return (
    <Form style={{textAlign: "right"}}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}>
      {jobEntries}
      <Button style={{ backgroundColor: "#0D47A1", 
              color: "white" }} 
              icon={<PlusCircleOutlined />} 
              onClick={addJob}>
        Add Work Experience
      </Button>
    </Form>
  );
}

export default WorkExperienceSection;
