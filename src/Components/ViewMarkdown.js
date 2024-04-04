import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Button, Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { API } from "../globle";

function ViewMarkdown() {
    const { id } = useParams();
    const [projectData, setProjectData] = useState(null);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API}/players/${id}`, {
                    headers: {
                        "x-auth-token": localStorage.getItem("token")
                    }
                });
                if (isMounted.current) {
                    setProjectData(response.data);
                }
            } catch (error) {
                console.error("Error loading project:", error);
            }
        };

        fetchData();

        return () => {
            isMounted.current = false;
        };
    }, [id]);

    const ImageComponent = ({ src, alt }) => (
        <img
            src={src}
            alt={alt}
            style={{ maxWidth: "300px", maxHeight: "300px", width: "auto", height: "auto" }}
        />
    );

    return (
        <Container>
            <Grid container justifyContent="center" style={{ marginTop: "70px" }}>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" style={{ backgroundColor: "rgb(250, 224, 228)" }}>
                        <CardContent>
                            <Link to="/dashboard/get" style={{ textDecoration: "none" }}>
                                <Button startIcon={<ReplyAllIcon />} variant="outlined">
                                    Back
                                </Button>
                            </Link>
                            <div style={{ marginTop: "20px" }}>
                                {projectData && (
                                    <>
                                        <Typography variant="h5">Title: {projectData.title}</Typography>
                                        <Typography variant="h5">Date: {projectData.date}</Typography>
                                        <div style={{ marginTop: "20px" }}>
                                            {/* <ReactMarkdown components={renderers}>{projectData.markdown}</ReactMarkdown> */}
                                            <ReactMarkdown components={{ img: ImageComponent }}>{projectData.markdown}</ReactMarkdown>
                                        </div>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ViewMarkdown;
