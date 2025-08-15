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
        <h1>Welcome to My Site</h1>
        <Carousel style={{marginLeft: "100px", marginRight: "100px" }}>
            {news.map((value, index) =>
                <Carousel.Item>
                    <Stack direction="horizontal" style={{justifyContent: "space-evenly", gap: "10px"}}>
                        {value.map((news, index) =>          
                            <Card style={{ height: "200px" }}>
                                <Card.Body>
                                    <Card.Title>{news.title}</Card.Title>
                                    <Card.Text style={{overflowY: "auto"}}>
                                        {news.summary}
                                    </Card.Text>
                                    <sub>{news.url}</sub>
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