import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel, Card, Stack } from "react-bootstrap";

const Home = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL
    });
    const [news, setNews] = useState([]);

    useEffect(() => {
        axiosInstance.get("getnews")
            .then(response => {
                let news = [];
                for(var i = 0; i < response?.data?.length; i += 3)
                {
                    let inner = [];
                    for(var j = i; j < i + 3 && j < response?.data?.length; j ++)
                    {
                        inner = [...inner, response?.data[j]];
                    }
                    news = [...news, inner];
                }
                setNews(news);
                console.log(news);
            })
            .catch(err => 
                console.log(err)
            );
    }, []);
    return (
        <>
        <h1>Tops News</h1>
        <Carousel style={{paddingLeft: "150px", paddingRight: "150px", paddingTop: "50px",
            paddingBottom: "50px"}} variant="dark">
            {news.map((value, index) =>
                <Carousel.Item>
                    <Stack direction="horizontal" style={{height: "max-content", justifyContent: "space-evenly", gap: "10px"}}>
                        {value.map((news, index) =>          
                            <Card style={{ height: "-webkit-fill-available", 
                                width: "calc(100% / 3)", backgroundColor: "#61dafb" }}>
                                <Card.Body>
                                    <Card.Title>{news.title}</Card.Title>
                                    <div style={{overflowY: "auto", maxHeight: "100px"}}>
                                        {news.text}
                                    </div>
                                    <sub><a href={news.url} target="_blank">Source</a></sub>
                                </Card.Body>
                            </Card>                     
                        )} 
                    </Stack>
                </Carousel.Item>
            )}
        </Carousel>
        </>
    );
};

export default Home;