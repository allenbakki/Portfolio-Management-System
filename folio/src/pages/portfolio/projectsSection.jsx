import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function ProjectSection() {
  const [numProjects, setNumProjects] = useState(0);

  function addProject() {
    setNumProjects(numProjects + 1);
  }

  function removeProject() {
    if (numProjects > 0) {
      setNumProjects(numProjects - 1);
    }
  }

  const projectEntries = [];
  for (let i = 0; i < numProjects; i++) {
    projectEntries.push(
      <div style={{
           borderRadius: 8,
           padding: 16,
           marginBottom: 16}}>
        <Form.Item label="Project Title"
                   name="Project Title">
            <Input />
        </Form.Item>
        <Form.Item label="Description"
                    name="Description">
        <TextArea rows={5} 
                  showCount
                  maxLength={500}/>
        </Form.Item>
        <Form.Item label="Link"
            name="Link">
            <Input />
        </Form.Item>
        <Button style={{ backgroundColor: "#B0B0B0", 
                color: "white" }}
                icon={<MinusCircleOutlined />}
                onClick={removeProject}>
          Remove
        </Button>
      </div>
    );
  }

  return (
    <Form style={{textAlign: "right"}}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}>
      {projectEntries}
      <Button style={{ backgroundColor: "#0D47A1", 
              color: "white" }} 
              icon={<PlusCircleOutlined />} 
              onClick={addProject}>
        Add Project
      </Button>
    </Form>
  );
}

export default ProjectSection;
