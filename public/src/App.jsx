import './styles/styles.css'
import Footer from './components/Footer';
import useAnimation from './lib/useAnimation';
import ProgressBar from './components/ProgressBar';
import Button from './components/Button'
import DropZone from './components/DropZone';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetFile from './lib/GetFile';
import { useState } from 'react';

import axios from 'axios';
import TextOutputCopyable from './components/TextOutputCopyable';

function App() {
  const [scene, setScene] = useState("UPLOAD")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fileLink, setFileLink] = useState(null)

  function onDropUpload(files) {
    upload(files[0])
  }

  function onManualUpload() {
    GetFile().then(upload)
  }

  function upload(file) {
    if (!file.type.startsWith("image/")) {
      toast.error('Must be an image!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setScene("LOADING")
    let formData = new FormData();
    formData.append("image", file)

    axios.post("http://localhost:3001/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progress) => {
        let uploadCompleted = Math.round((progress.loaded) / progress.total)
        setUploadProgress(uploadCompleted)
      }
    }).then(resp => {
      let rj = resp.data;
      if (!rj.type == 'error') {
        toast.error(rj.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });

        setScene("LOADING")
        setUploadProgress(0)

        return
      }

      setFileLink(rj.file)
    })
  }

  return (
    <>
      <div className="container">
        { scene == "UPLOAD" && 
          <>
            <h2>Upload your image</h2>
            <p className='text-desc'>File should be Jpeg, Png,...</p>
            <DropZone onDrop={onDropUpload}/>
            <p className='text-desc'>Or</p>
            <Button text="Choose a file" onClick={onManualUpload}/>
          </>
        }
        {
          scene == "LOADING" &&
          <>
            <h2>Loading..</h2>
            <ProgressBar fill={uploadProgress} onAnimationCompleted={() => { setScene("FINISHED") }}/>
          </>
        }
        {
          scene == "FINISHED" &&
          <>
            <img src={`https://image-upload-47br.onrender.com/image/${fileLink}`} alt="preview: " className="preview" />
            <TextOutputCopyable buttonText="Copy link" text={`http://localhost:3001/image/${fileLink}`} />
          </>
        }
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
