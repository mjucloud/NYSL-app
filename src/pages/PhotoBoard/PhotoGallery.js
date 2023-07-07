import React from "react";
import { useState, useEffect } from "react";
import { CustomNextArrow, CustomPrevArrow } from "../Home/game_schedule";
import { collection, getDocs, query } from "firebase/firestore";
import { Card } from "react-bootstrap";
import { database } from "../../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



export const PhotoGallery = ({ setSelectedImgUrl }) => {
  const [imgList, setImgList] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('Match 1');
  const handleMatchChange = (e) => {
    setSelectedMatch(e.target.value);
  };
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const messageRef = collection(database, 'NorthsidePhotoBoard', 'photos', selectedMatch);
        const q = query(messageRef);
        const querySnapshot = await getDocs(q);

        const images = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          images.push({
            url: data.imageURL,
            match: data.match,
            description: data.description,
          });
        });

        setImgList(images);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, [selectedMatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };


  const matchOptions = Array.from({ length: 17 }, (_, index) => (
    <option key={index} value={`Match ${index + 1}`}>
      Match {index + 1}
    </option>
  ));

  return (
    <div>
      {imgList.length > 0 ? (
        <>
      <select value={selectedMatch} onChange={handleMatchChange} className='matchSelector'>
        {matchOptions}
      </select>
      <Slider {...settings}>
         
         { imgList.map((imgData, index) => (
            <Card key={index} onClick={() => setSelectedImgUrl(imgData.url)} className="photoCard">
              <Card.Img variant="top" src={imgData.url} alt={`${index + 1}`} height={240} />
              <Card.Body>
                <Card.Subtitle>{imgData.match}</Card.Subtitle>
                <Card.Text>{imgData.description}</Card.Text>
              </Card.Body>
            </Card>
          ))
          }
      </Slider>
      </>
      ) : (
        <p className="text-center imgText">There aren't any pictures here yet...</p>
      )}
    </div>
  );
};
