import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { ImgUploadForm } from "./ImageUploadForm";
import { onAuthStateChanged } from "firebase/auth";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./photoBoard.css";
import { PhotoGallery } from "./PhotoGallery";


const PhotoBoard = () => {
  const [imgUrl, setImgUrl] = useState(null)
  const [selectedImgUrl, setSelectedImgUrl] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0) //set progress tab


  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setIsUserLoggedIn(!!user);
  });

  return () => {
    unsubscribe();
  };
}, []);



  return (
    <div className="container">
      {
        <PhotoGallery setSelectedImgUrl={setSelectedImgUrl} />
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
      {isUserLoggedIn && <ImgUploadForm setImgUrl={setImgUrl} setProgressPercent={setProgressPercent} />}
      {
        !imgUrl && isUserLoggedIn && 
        <div className='progress-bar'>
          <div className='innerbar' style={{ width: `${progressPercent}%` }}>{progressPercent}%</div>
        </div>
      }
      {
        imgUrl &&
        <div className="img-upload-result">
          <p className="text-center">Successfully Uploaded the New Image!</p>
        <img src={imgUrl} alt='uploaded file' height={100} />
        </div>
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