import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, listAll, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from 'uuid';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./photoBoard.css";
import { CustomNextArrow, CustomPrevArrow } from "../Home/game_schedule";
import { Card } from "react-bootstrap";

const PhotoGallery = ({ imgList, setSelectedImgUrl }) => {
  const settings = {
    dots: true,
    infinite: false,
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Slider {...settings}>
      {imgList.map((url, index) => (
        <Card key={index} onClick={() => setSelectedImgUrl(url)}>
          <Card.Img variant="top" src={url} alt={`${index + 1}`} height={200} />
          <Card.Body>
            <Card.Subtitle>Match of the Photo</Card.Subtitle>
            <Card.Text>Any additional information added by the user who uploaded the image</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Slider>
  );
};
const PhotoBoard = () => {
  const [imgUrl, setImgUrl] = useState(null)
  const [imgList, setImgList] = useState([]);
  const [selectedImgUrl, setSelectedImgUrl] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0) //set progress tab

  const storageRef = ref(storage, 'images/');

  const handleOnSubmit = (e) => {
    e.preventDefault(); // prevent auto submission

    const file = e.target[0]?.files[0];
    console.log(file);

    if (!file) return;

    const imageRef = ref(storage, `images/${file.name + v4()}`);

    //upload file
    const uploadTask = uploadBytesResumable(imageRef, file);

    // state changed

    uploadTask.on('state_changed', (snapshot) => {

      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgressPercent(progress);

    },
      (error) => {
        alert(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl) => {
            setImgUrl(downloadUrl)
          })
      }
    );
  };


  useEffect(() => {
    listAll(storageRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImgList((prev) => [...prev, url])
        })
      })
    })
  }, [])


  return (
    <div className="App">
    
      {
        imgList &&
        <PhotoGallery imgList={imgList} setSelectedImgUrl={setSelectedImgUrl}/>
      }
      {
        selectedImgUrl && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setSelectedImgUrl(null)}>&times;</span>
              <img src={selectedImgUrl} alt='expanded file' className="expanded-image" />
            </div>
          </div>
        )
      }
       <form className='form' onSubmit={handleOnSubmit}>
        <input type='file' required />
        <button type='submit'>Upload</button>
      </form>
      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progressPercent}%` }}>{progressPercent}%</div>
        </div>
      }
      {
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />
      }

    </div>
  );
}

export default PhotoBoard;

/* const [imageUpload, setImgUpload] = useState(null)
const uploadImage = () => {
  if (!imageUpload) return;
  const imageRef = ref(storage, `images/${imageUpload.name +v4()});
  uploadBytes (imageRef, imageUpload).then(()=>{
 alert ('Image Uploaded');
  })

  return (
    <div className="App">
      <input type='file' onChange={(event)=> {setimageUpload(event.target.files[0])}}/>
      <button type='submit' onClick={uploadImage}>Upload</button
    </div>
  )

  {
        imgList.map((url) => {
          return (
            <img src={url} alt='img' />
          )
        })
      }
} */