import React, { useState } from 'react';
import './Carousel.scss'

const Carousel = (props) => {

    const [slide, setSlide] = useState(0);
    const back = () => slide !== 0 ? setSlide(slide-1) : setSlide(props.img.length-1);
    const forward = () => slide !== props.img.length-1 ? setSlide(slide+1) : setSlide(0);
    const wrapClass = `
        carousel slide
        ${props.className && props.className}
    `

    return (
    <div className={wrapClass} data-ride="carousel">
        <ol className="carousel-indicators">
            {props.img.map((e, i) => 
                <li 
                    className={slide === i ? 'active' : null} 
                    onClick={() => setSlide(i)} key={i} 
                    style={{backgroundColor: props.color ? props.color : '#DDDDDD'}} />
            )}
        </ol>
        <div className="carousel-inner">
            {
                props.img.map((img, i) => {
                    return (
                    <div className={slide === i ? 'carousel-item active' : 'carousel-item'} key={i}>
                        <div className="d-block w-100 img" style={{backgroundImage: `url(${img.src})`}} alt={i}  />
                    </div>
                    )
                })
            }
        </div>
        <a className="carousel-control-prev justify-content-start" onClick={back}>
            <span className="prev-icon" style={{backgroundColor: props.color ? props.color : '#416F37'}}>
                <svg width="14" height="25" viewBox="0 0 14 25">
                    <path d="M-4.465-8.956A1.215,1.215,0,0,0-4.475-7.3L6.6,4.029a1.1,1.1,0,0,0,1.6,0l.667-.693a1.205,1.205,0,0,0,0-1.66l-9.605-9.8,9.614-9.8a1.205,1.205,0,0,0,0-1.66L8.2-20.282a1.1,1.1,0,0,0-1.6,0Z" transform="translate(4.798 20.627)" fill={'#FFFFFF'} />
                </svg>
            </span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next justify-content-end" onClick={forward}>
            <span className="next-icon" style={{backgroundColor: props.color ? props.color : '#416F37'}}>
                <svg width="14" height="25" viewBox="0 0 14 25">
                    <path d="M8.9-7.3a1.215,1.215,0,0,0,.009-1.66L-2.165-20.282a1.1,1.1,0,0,0-1.6,0l-.667.693a1.205,1.205,0,0,0,0,1.66l9.605,9.8-9.614,9.8a1.205,1.205,0,0,0,0,1.66l.667.693a1.1,1.1,0,0,0,1.6,0Z" transform="translate(4.771 20.627)" fill={'#FFFFFF'} />
                </svg>
            </span>
            <span className="sr-only">Next</span>
        </a>
    </div>
    )
}

export default Carousel;