import axios from "axios";
import { useEffect, useState } from "react";
import { Nav, Stack } from "react-bootstrap";
import { useScroll, motion, Variants } from "framer-motion";

const AboutMe = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL
    });

    const [aboutMeInfo, setAboutMeInfo] = useState([]);
    const { scrollYProgress } = useScroll();

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
        <Stack>
            {
                aboutMeInfo.map((value, index) => 
                    <Card header={value.section} text={value.content} />
                )
            }
        </Stack>
    );
};

const Card = ({header, text}) => {
    return (
        <>
        <h3>
            {header}
        </h3>
        <motion.div
            style={{textAlign: "left"}}
            initial={{scale: 0.5, }}
            whileInView={{ 
                scale: 1,
                transition: {
                    type: "linear", duration: 0.8
                }
            }}
            viewport={{ amount: 0.8 }}
        >
            {text}
        </motion.div>
        </>
    );
};

export default AboutMe;