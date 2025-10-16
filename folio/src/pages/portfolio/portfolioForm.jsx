import { Form, Input, Button } from "antd";
import EducationSection from "./educationSection";
import WorkExperienceSection from "./workExperienceSection";
import ProjectSection from "./projectsSection";

const { TextArea } = Input;

function PortfolioForm() {

    return (
        <Form labelCol={{ span: 8}}
              wrapperCol={{ span: 16 }}>
            <h2>General</h2> 
            <Form.Item label="Name"
                       name="Name"
                       rules={[{required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Professional Title"
                       name="Professional Title"
                       rules={[{required: true}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Email"
                        name="Email">
                <Input />
            </Form.Item>
            <Form.Item label="Location"
                       name="Location">
                <Input />
            </Form.Item>
            <Form.Item label="LinkedIn"
                       name="LinkedIn">
                <Input />
            </Form.Item>
            <h2>Bio</h2> 
            <Form.Item label="About Me"
                       name="About Me"
                       rules={[
                           { required: true}
                       ]}>
            <TextArea rows={10} 
                      showCount
                      maxLength={500}/>
            </Form.Item>
            <h2> Work Experience </h2> 
            <WorkExperienceSection />
            <h2> Education </h2> 
            <EducationSection />
            <h2> Projects </h2> 
            <ProjectSection />
        </Form>
    );
}

export default PortfolioForm;