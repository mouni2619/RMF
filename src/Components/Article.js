import React, { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import html2pdf from 'html2pdf.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import "./Article.css"
import { faFilePdf, faFileCode } from '@fortawesome/free-solid-svg-icons';

function Article({ markdown }) {
    const outputRef = useRef(null);
    const [showOptions, setShowOptions] = useState(false);
    const handleDownload = (type) => {
        const htmlContent = outputRef.current.innerHTML;
        if (type === "pdf") {
            const element = document.createElement("div");
            element.innerHTML = htmlContent;
            html2pdf(element, {
                margin: 1,
                filename: 'output.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            });
        } else if (type === "html") {
            const blob = new Blob([htmlContent], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "output.html";
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
        setShowOptions(false); // Close the download options
    };

    // Function to render images with maximum width
    const renderImage = (props) => {
        return <img {...props} style={{ maxWidth: "300px", maxHeight: "300px", height: "auto" }} alt="markdown"/>;
    };


    return (
        <article className="result" style={{ backgroundColor: "rgb(250, 224, 228)", color: "black", width: "100%", paddingLeft: "10px", borderColor: "black", position: "relative" }}>
            <div ref={outputRef}>
                <ReactMarkdown components={{ img: renderImage }}>{markdown}</ReactMarkdown>          </div>
            <div style={{ position: "absolute", top: "5px", right: "10px" }}>
                <FontAwesomeIcon icon={faDownload} className="cursor-pointer text-success" onClick={() => setShowOptions(!showOptions)} />
                {showOptions && (
                    <div style={{ position: "absolute", top: "35px", right: "0", backgroundColor: "white", border: "1px solid black", borderRadius: "5px", padding: "5px" }}>
                        <div style={{ cursor: "pointer", marginBottom: "5px" }} onClick={() => handleDownload("pdf")}>
                            <FontAwesomeIcon icon={faFilePdf} className="cursor-pointer text-danger" style={{ marginRight: "5px" }} />

                        </div>
                        <div style={{ cursor: "pointer" }} onClick={() => handleDownload("html")}>
                            <FontAwesomeIcon icon={faFileCode} className="cursor-pointer text-danger" style={{ marginRight: "5px" }} />

                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}

export default Article;
