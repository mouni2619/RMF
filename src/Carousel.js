import React from "react"
import myImage from './images/mark2.jpeg'; 
import myImage1 from './images/mark1.jpeg';// Path to your image
import myImage2 from './images/mark3.jpeg';// Path to your image
import myImage3 from './images/mark4.jpeg';// Path to your image

function Carousel() {
    return (
        <>
        <div className="carousel slide" data-bs-ride="carousel" id="carousel1" style={{backgroundColor:"lightblue"}}>
            <div className="carousel-indicators">
                <div data-bs-target="#carousel1" data-bs-slide-to="0" className="active"></div>
                <div data-bs-target="#carousel1" data-bs-slide-to="1" ></div>
                <div data-bs-target="#carousel1" data-bs-slide-to="2"></div>
                <div data-bs-target="#carousel1" data-bs-slide-to="3"></div>
            </div>
            <div className="carousel-inner" style={{ textAlign:"center" }}>
                <div className="carousel-item active">
                    <img src="https://th.bing.com/th/id/OIG4.t6J7OE48zL1u4SYAYrtZ?w=270&h=270&c=6&r=0&o=5&dpr=1.8&pid=ImgGn" alt="" style={{ maxWidth: "100%", maxHeight: "350px" }} />
                </div>
                <div className="carousel-item ">
                    <img src={myImage} alt="" style={{ maxWidth: "1000px", maxHeight: "350px" }} />
                    
                </div>
                <div className="carousel-item">
                    <img src={myImage1} alt="" style={{ maxWidth: "100%", maxHeight: "350px" }} />
                </div>
                <div className="carousel-item">
                    <img src={myImage2} alt="" style={{ maxWidth: "100%", maxHeight: "350px" }} />
                </div>
            </div>
            <a href="#carousel1" data-bs-slide="prev" className="carousel-control-prev"> <i className="carousel-control-prev-icon"></i> </a>
            <a href="#carousel1" data-bs-slide="next" className="carousel-control-next"> <i className="carousel-control-next-icon"></i> </a>
        </div>
        </>
    );
}

export default Carousel;

