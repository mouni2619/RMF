import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Typography, Grid } from '@mui/material';
import "./Homee.css"

function Home() {
  const [colors, setColors] = useState(['#005f00']);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);


  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000); // Change color every second

    return () => clearInterval(interval);
  }, [colors.length]);

  const sections = [
    {
      title: '',
      content: [
        "React Markdown is a powerful React component designed to simplify the conversion of Markdown text into HTML code, offering developers a straightforward solution for integrating Markdown content into their React applications. With its intuitive interface and robust functionality, React Markdown enhances the readability and presentation of text, providing users with a seamless and engaging experience. Its flexibility and customizability make it an ideal choice for developers looking to create dynamic and visually appealing content in their React projects."
      ],
      button: {
        label: 'Get Started',
        link: '/dashboard/create',
      },
    },
    {
      title: 'Our Project Features',
      content: [
        {
          title: '💙Markdown Editor',
          text: 'Our project provides a powerful Markdown editor that allows users to create and edit Markdown documents with ease. The editor features syntax highlighting, auto-indentation, and live preview, making it easy to write and format Markdown text.',
        },
        {
          title: '💙Project Management',
          text: 'Users can create new projects in our project management system. Each project can contain multiple Markdown documents, which users can edit, read, and delete. Projects are organized in a user-friendly interface, making it easy to manage and navigate.',
        },
        {
          title: '💙Download and Upload',
          text: 'Users can download their Markdown documents in various formats, including Markdown, HTML, and PDF. This feature allows users to share their documents with others or use them in other applications. Users can also upload Markdown files to their projects, making it easy to collaborate with others or work on documents across different devices.',
        },
        {
          title: '💙Project Lists',
          text: 'Our project lists all the projects created by the user. Users can easily view their projects, see when they were last modified, and access them for editing or reading. The project list provides a convenient way to organize and manage all the user\'s projects.',
        },
        {
          title: '💙Edit, Read, Delete',
          text: 'Users can edit their existing projects, making changes to the Markdown documents as needed. They can also read their documents to review their content or make changes. If a project is no longer needed, users can delete it to free up space and keep their project list organized.',
        },
      ],
    },

    {
      title: 'Examples',
      content: [
        {
          syntax: '# Heading 1',
          output: <h1>Heading 1</h1>,
        },
        {
          syntax: '## Heading 2',
          output: <h2>Heading 2</h2>,
        },
        {
          syntax: '*Italic Text*',
          output: <em>Italic Text</em>,
        },
        {
          syntax: '**Bold Text**',
          output: <strong>Bold Text</strong>,
        },
        {
          syntax: '[Link Text](https://www.example.com)',
          output: <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Link Text</a>,
        },
        {
          syntax: '`Inline Code`',
          output: <code>Inline Code</code>,
        },
        {
          syntax: '```javascript\nconsole.log("Hello, World!");\n```',
          output: <pre><code>console.log("Hello, World!");</code></pre>,
        },
        {
          syntax: '1. Ordered List Item 1\n2. Ordered List Item 2\n3. Ordered List Item 3',
          output: (
            <ol>
              <li>Ordered List Item 1</li>
              <li>Ordered List Item 2</li>
              <li>Ordered List Item 3</li>
            </ol>
          ),
        },
        {
          syntax: '- Unordered List Item 1\n- Unordered List Item 2\n- Unordered List Item 3',
          output: (
            <ul>
              <li>Unordered List Item 1</li>
              <li>Unordered List Item 2</li>
              <li>Unordered List Item 3</li>
            </ul>
          ),
        },
        {
          syntax: '> Blockquote',
          output: <blockquote>Blockquote</blockquote>,
        },
        {
          syntax: '![Alt Text](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReV93UYIog6VtHnJu71IuPKZeCATIwI0ZDsQdngPPKYA&s)',
          output: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReV93UYIog6VtHnJu71IuPKZeCATIwI0ZDsQdngPPKYA&s" alt="Alt Text" />,
        },
      ],
    },
  ];

  return (


    <div className="home-container" style={{ marginTop: "55px", backgroundColor: "aliceblue", padding: "50px" }}>
      <Typography
        variant="h3"
        style={{ textAlign: 'center' }}
        className="rainbow-text"

      >
        Welcome To React Markdown
      </Typography><br />
      <Grid container spacing={2}>
        {sections.map((section, index) => (
          <Grid item xs={12} key={index}>
            <section className={section.title.toLowerCase().replace(/\s+/g, '-')}>
              <Typography variant="h4" style={{ color: colors[currentColorIndex] }}>
                {section.title}
              </Typography>
              {section.content.map((content, idx) => (
                <div key={idx}>
                  {typeof content === 'string' ? (
                    <Typography variant="body1" gutterBottom>
                      {content}
                    </Typography>
                  ) : (
                    <div>
                      <Typography variant="h6" style={{ color: "red" }} >{content.title}</Typography>
                      <Typography variant="body1" gutterBottom>
                        {content.text}
                      </Typography>
                    </div>
                  )}
                </div>
              ))}
              {section.title === 'Examples' && (
                <>
                  {section.content.map((content, idx) => (
                    <div key={idx} className="example">
                      <div className="example-code">
                        <code>{content.syntax}</code>
                        <p>Rendered Output:</p>
                        <code>{content.output}</code>
                      </div>
                    </div>
                  ))}
                </>
              )}
              {section.button && (
                <Button variant="contained" href={section.button.link} className='GetStarted'>
                  {section.button.label}
                </Button>
              )}
            </section>
          </Grid>
        ))}
      </Grid>

      <footer>
        <Typography variant="body1">&copy; 2024 React Markdown. All Rights Reserved.</Typography>
        <Typography variant="body1">
          Contact Us: <a href="mailto:mounikaadada744@gmail.com">mounikaadada744@gmail.com</a>
        </Typography>
      </footer>
    </div>
  );
}

export default Home;

