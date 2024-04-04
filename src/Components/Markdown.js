import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import { CheckAuth } from "../Auth/CheckAuth";
import { LogOut } from "../Auth/LogOut";
import { API } from "../globle";
import "./Markdown.css"

function Markdown() {
    const [data, setData] = useState([])

    useEffect(() => {
        getDetails();
    }, []);

    const getDetails = () => {
        fetch(`${API}/players/markdown/${localStorage.getItem("email")}`, {
            method: "GET",
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then((data) => CheckAuth(data))
            .then((mbs) => setData(mbs))
            .catch((err) => LogOut())
    }

    const projectDelete = async (id) => {
        try {
            let ask = window.confirm("Do you want to delete this data?");
            if (ask) {
                await axios.delete(`${API}/players/${id}`);
                getDetails();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="create" style={{ marginTop: "70px", marginLeft: "20px", marginRight: "20px" }}>
            <h1 style={{ textAlign: "center", color: "red", backgroundColor: "#f5f5f5" }}>My Projects</h1>
            <Table striped bordered hover style={{ backgroundColor: "#f5f5f5", }}>
                <thead >
                    <tr >
                        <th style={{ backgroundColor: "pink" }}>S.No</th>
                        <th style={{ backgroundColor: "pink" }}>Title</th>
                        <th style={{ backgroundColor: "pink" }}>Date</th>
                        <th style={{ backgroundColor: "pink" }}>Operations</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((project, index) => (
                        <tr key={project._id}>
                            <td>{index + 1}</td>
                            <td>{project.title}</td>
                            <td>{project.date}</td>
                            <td>
                                <Stack direction="row" spacing={2}>
                                    <IconButton component={Link} to={`/dashboard/view/${project._id}`} style={{ color: "#2196f3" }}><ViewIcon /></IconButton>
                                    <IconButton component={Link} to={`/dashboard/edit/${project._id}`} style={{ color: "#4caf50" }}><EditIcon /></IconButton>
                                    <IconButton onClick={() => projectDelete(project._id)} style={{ color: "#f44336" }}><DeleteIcon /></IconButton>
                                </Stack>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>

        </div>
    )
}

export default Markdown;

