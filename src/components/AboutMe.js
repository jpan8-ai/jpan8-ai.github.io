import axios from "axios";
import { useEffect, useState } from "react";
import { Nav, Stack } from "react-bootstrap";

const AboutMe = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL
    });

    const [aboutMeInfo, setAboutMeInfo] = useState([]);

    useEffect(() => {
        axiosInstance.get("aboutme")
            .then(response => {
                setAboutMeInfo(response.data);
                console.log(response);
            })
            .catch(err => 
                console.log(err)
            );
    }, []);

    return (
        <Stack direction="horizontal">
            <Nav defaultActiveKey="/home" className="flex-column">
                {
                    aboutMeInfo.map((value, index) => 
                        <Nav.Link>
                            {value.section}
                        </Nav.Link>
                    )
                }
            </Nav>
            <Stack>
                {aboutMeInfo.map(content => 
                    <span style={{textAlign: "left"}}>
                        {content.content}
                    </span>
                )}
            </Stack>
        </Stack>
    );
};

export default AboutMe;