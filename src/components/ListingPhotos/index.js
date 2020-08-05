import React from 'react';
import Slider from 'react-slick';
import './ListingPhotos.scss'

const ListingPhotos = (props) => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2.5 ,
        slidesToScroll: 1,
        variableWidth: true
      };
    const wrapClass = `
    listing-photos-wrap
    cursor-grab
    m-header
    ${props.className && props.className}
    `
    return (
        <div className={wrapClass}>
        <Slider {...settings}>
          {props.photos && props.photos.length > 0 &&
            props.photos.map(e => <img key={e.id} src={e.src} alt=""/>)
          }
        </Slider>
      </div>
    )
}

export default ListingPhotos