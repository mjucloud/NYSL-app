import React, { useState, useEffect } from "react";
import { storage} from "../../firebase";
import { ImgUploadForm } from "./ImageUploadForm";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./photoBoard.css";
import { PhotoGallery } from "./PhotoGallery";


const PhotoBoard = () => {
  const [imgUrl, setImgUrl] = useState(null)
  const [imgList, setImgList] = useState([]);
  const [selectedImgUrl, setSelectedImgUrl] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0) //set progress tab

  const storageRef = ref(storage, 'images/');

  


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
    <div className="container">
      {!storageRef &&
        <p>
          Please Sign In!
        </p>

      }
      {
        imgList &&
        <PhotoGallery imgList={imgList} setSelectedImgUrl={setSelectedImgUrl} />
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
      <ImgUploadForm setImgUrl={setImgUrl} setProgressPercent={setProgressPercent} />
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