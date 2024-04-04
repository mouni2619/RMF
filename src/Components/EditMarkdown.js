import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../globle";
import Button from 'react-bootstrap/Button';
import "./EditMarkdown.css"
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function EditMarkdown() {
    const { id } = useParams();
    const [editdata, setEditData] = useState(null)

    useEffect(() => {
        fetch(`${API}/players/${id}`, {
            method: "GET",
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then((dt) => dt.json())
            .then((details) => setEditData(details))
    }, [])



    return (

        <div>{editdata ? <Edit editdata={editdata} /> : null}</div>

    );
}


function Edit({ editdata }) {
    const formatDate = (isoDate) => {
        const dateObj = new Date(isoDate);
        return dateObj.toISOString().split('T')[0];
    };
    const [markdown, setMarkdown] = useState(editdata.markdown);
    const [title, setTitle] = useState(editdata.title);
    const [date, setDate] = useState(formatDate(editdata.date)); // Display created date by default

    const navigate = useNavigate();

    const onTextChange = e => setMarkdown(e.target.value);
    const onTitleChange = e => setTitle(e.target.value);
    const onDateChange = e => setDate(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();

        // Format current date and time in Kolkata time zone
        const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const data = { markdown, title, date: currentDate };

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify(data)
        };

        fetch(`${API}/players/${editdata._id}`, requestOptions)
            .then(response => response.json())
            .then(() => navigate("/dashboard/get"));
    };

    // Function to format date from ISO format to input date format (YYYY-MM-DD)
    const ImageComponent = ({ src, alt }) => (
        <img
            src={src}
            alt={alt}
            style={{ maxWidth: "300px", maxHeight: "300px", width: "auto", height: "auto" }}
        />
    );

    return (
        <form className="markdown" style={{ marginTop: "80px" }}>
            <div className="row justify-content-end">
                <div className="col-auto">
                    <Link to="/dashboard/get" style={{ textDecoration: "none" }}>

                        <i className="bi bi-arrow-left-circle-fill"></i>
                        BACK
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={onTitleChange}
                        required />
                </div>
                <div className="col-sm-12 col-md-6">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={onDateChange}
                        required />
                </div>
            </div>
            <div className="row">
                <textarea
                    className="input col"
                    value={markdown}
                    onChange={onTextChange}
                    required />
                <article className="result col">
                    <ReactMarkdown components={{ img: ImageComponent }}>{markdown}</ReactMarkdown>
                </article>
            </div>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <Button type="submit" onClick={handleSubmit} variant="primary" className="editbtn">
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
}
