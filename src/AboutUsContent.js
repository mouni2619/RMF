import React from "react";
import Layout from "./Layout";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import backgroundImage  from "./images/mex.png";
import Courosel from "./Carousel"
import "./About.css"

function AboutUsContent() {
  return (
    <Container maxWidth="md">
      <Courosel></Courosel>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        A React Markdown viewer is a component or application that allows users to view Markdown content rendered as formatted text or HTML within a React application. It typically provides a user interface for displaying Markdown content and may include features such as syntax highlighting, table of contents, and live preview.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Why Use Markdown Previewers?
      </Typography>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li className="heartlist"><b className="highlight"> Easy Formatting:</b> Markdown provides a simple way to format text without needing to write HTML directly.</li>
        <li className="heartlist"><b className="highlight"> Readability:</b> Markdown is human-readable and can be quickly understood even in its raw form.</li>
        <li className="heartlist"><b className="highlight"> Portability:</b> Markdown files can be easily converted to HTML, PDF, or other formats, making them versatile for various purposes.</li>
        <li className="heartlist"><b className="highlight"> Version Control:</b> Markdown files can be tracked in version control systems like Git, providing a clear history of changes.</li>
      </ul>

      <Typography variant="h4" gutterBottom>
        How to Use Markdown Previewers?
      </Typography>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li className="heartlist"><b className="highlight">Input Markdown Text:</b> Enter Markdown syntax in a text editor or input field.</li>
        <li className="heartlist"><b className="highlight">Preview Rendered Output:</b> View the rendered HTML output in a preview pane or area.</li>
        <li className="heartlist"><b className="highlight">Real-Time Updates:</b> As you type or modify the Markdown text, the preview pane updates to show the rendered output.</li>
      </ul>

      <Typography variant="h4" gutterBottom>
        Purpose of Markdown Previewers
      </Typography>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li className="heartlist"><b className="highlight">Documentation:</b> Markdown is commonly used for writing documentation due to its simplicity and readability. A previewer helps authors see how their documentation will look when published.</li>
        <li className="heartlist"><b className="highlight">Blogging:</b> Many blogging platforms support Markdown for writing posts. A previewer allows bloggers to see a live preview of their posts as they write.</li>
        <li className="heartlist"><b className="highlight">Note-Taking:</b> Markdown is popular for taking notes due to its lightweight nature. A previewer can enhance the note-taking experience by showing formatted notes in real-time.</li>
        <li className="heartlist"><b className="highlight">Content Creation:</b> Markdown previewers are used in content creation workflows, allowing authors to focus on writing while seeing a live preview of the content.</li>
      </ul>

      <Typography variant="body1" paragraph>
        <b className="highlight">Example:</b>
        Here's a basic example of how the React Markdown viewer will look:
      </Typography>
      <Typography variant="body1" paragraph>
        <img src="https://www.freecodecamp.org/news/content/images/2020/05/image-177.png" alt="mex" className="img-fluid" />
      </Typography>
    </Container>
  );
}
export default AboutUsContent