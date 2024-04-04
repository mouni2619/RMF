import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../globle";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrashAlt, faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import "../App.css";
import Article from "./Article";
import "./CreateMarkdown.css"

function CreateMarkdown() {
    const [markdown, setMarkdown] = useState("# Markdown Preview");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [copied, setCopied] = useState(false);
    const [Clear, setClear] = useState(false);
    const [save, setSave] = useState(false);
    const [id, setId] = useState("viewer-output"); // Default ID
    const navigate = useNavigate();

    const onTextChange = (e) => setMarkdown(e.target.value);

    const onTitleChange = (e) => setTitle(e.target.value);

    const onDateChange = (e) => setDate(e.target.value);

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
        setCopied(true); // Update copied status
        setTimeout(() => setCopied(false), 1000);
    };

    const handleClear = () => {
        setMarkdown("");
        setClear(true)
        setTimeout(() => setClear(false), 1000);

    };

    const handleSaveFile = () => {
        const element = document.createElement("a");
        const file = new Blob([markdown], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = "markdown.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();

        setSave(true)
        setTimeout(() => setSave(false), 1000);
    };

    const handleUploadFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const contents = e.target.result;
            setMarkdown(contents);
        };

        reader.readAsText(file);
    };




    const handleSubmit = (e) => {
        e.preventDefault();

        const currentDate = new Date();
        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
        };

        const formattedDate = currentDate.toLocaleString("en-US", options).replace(/\b0/g, '');



        const data = { markdown, title, date: formattedDate };
        data.email = localStorage.getItem("email");

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(data),
        };

        fetch(`${API}/players`, requestOptions)
            .then((response) => response.json())
            .then(() => navigate("/dashboard/get"));
    };


    return (
        <div className="markdown" style={{ marginTop: "70px" }} >
            <div className="row">
                <div className="col-sm-12 col-md-6">

                    <label>Title:</label>
                    <input type="text" value={title} onChange={onTitleChange} required className="form-control" style={{ backgroundColor: "rgb(250, 224, 228)" }} />

                </div>
                <div className="col-sm-12 col-md-6">

                    <label>Date:</label>
                    <input type="date" value={date} onChange={onDateChange} required className="form-control" style={{ backgroundColor: "rgb(250, 224, 228)" }} />

                </div>
            </div>
            <div className="row">
                <div className="position-relative col-md-6">
                    <div className="textarea-container">
                        <div className="navbar" style={{ backgroundColor: "", borderRadius: "5px", }}>
                            <div className="icon-container" >
                                {copied && <span className="copied-message">Copied!</span>}
                                <button onClick={handleCopy} style={{ backgroundColor: "", borderRadius: "5px", border: "none" }}>
                                    <FontAwesomeIcon icon={faCopy} onClick={handleCopy} className="cursor-pointer text-dark" />
                                    <span className="icon-label">Copy</span>
                                </button>

                            </div>
                            <div className="icon-container">
                                {Clear && <span className="copied-message">cleared!</span>}
                                <button onClick={handleClear} style={{ backgroundColor: "", borderRadius: "5px", border: "none" }}>
                                    <FontAwesomeIcon icon={faTrashAlt} onClick={handleClear} className="cursor-pointer text-dark" />
                                    <span className="icon-label">Clear</span>
                                </button>
                            </div>
                            <div className="icon-container">
                                {save && <span className="copied-message">saved!</span>}
                                <button onClick={handleSaveFile} style={{ backgroundColor: "", borderRadius: "5px", border: "none" }}>
                                    <FontAwesomeIcon icon={faSave} onClick={handleSaveFile} className="cursor-pointer text-dark" />
                                    <span className="icon-label">Save</span>
                                </button>
                            </div>
                            <div className="icon-container">

                                <button style={{ backgroundColor: "", borderRadius: "5px", border: "none" }}>

                                    <label htmlFor="file-upload" className="cursor-pointer text-dark">

                                        <FontAwesomeIcon icon={faUpload} className="cursor-pointer text-dark" />
                                    </label>
                                    <input id="file-upload" type="file" onChange={handleUploadFile} style={{ display: "none" }} />
                                    <span className="icon-label">Upload</span>
                                </button>
                            </div>
                        </div>
                        <textarea
                            className="in"
                            value={markdown}
                            style={{ backgroundColor: "rgb(250, 224, 228)", color: "darkblue", width: "100%", }}
                            onChange={onTextChange}
                            required
                        />
                    </div>
                </div>
                <div className="col-md-6 " style={{ marginTop: "41px" }}>
                    <Article markdown={markdown} style={{ width: "100%" }} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <Button type="submit" onClick={handleSubmit} variant="primary" className="editbtn">
                        Submit
                    </Button>
                </div>
            </div>
        </div>

    );
}

export default CreateMarkdown;
