import React from 'react'
import PropTypes from 'prop-types'
import { Camera, Edit, Loader, CheckCircle, AlertOctagon, Upload } from 'react-feather'
import {useDropzone} from 'react-dropzone'

import Button from 'components/Button/Button';
import './UploadImage.scss';


const UploadImage = (props) => {

  const onDrop = props.onDrop;

  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop });

  return (
    <>
    <div className="upload-button-wrap" {...getRootProps()}>
        <div className={`upload-button ${props.image && props.state === 'ready' ? 'active-image' : null}`}>
          <input 
            {...getInputProps()} 
            accept="image/*"
            multiple={props.multiple ? true : false}
          />
          <div className="card-body">
            { props.state === 'ready' ? 
              <>
              { props.image ? 
                <>
                <Edit className="edit-btn" />
                <img src={props.image} className="default-img" alt="current" />
                </>
                :
                <>
                <Camera className="static" />
                
                { isDragActive ? <p>Drop .jpg or .png here</p> : <p>Drop image here or <u>browse.</u></p> }
                </>
              }
              </> 
            : null}

            { props.state === 'uploading' ? 
              <>
              <Loader className="spin" />
              <h5>Uploading</h5>
              </> 
            : null}

            { props.state === 'success' ? 
              <>
              <CheckCircle />
              <h5>Success</h5>
              <p>File has been uploaded</p>
              </> 
            : null}

            { props.state === 'error' ? 
              <>
              <AlertOctagon />
              <h5>Error</h5>
              <p>Please upload a valid .png or .jpg file less than 1mb</p>
              </> 
            : null}
          </div>
        </div>
        { (props.file && props.file.data) &&
        <div className="my-3 text-center">
        { (props.file && props.file.data) && 
              <span className="file-info">
                <button className="btn btn-link">{props.file.data.name}</button>
              </span> 
            }

            { (props.file && !props.file.data) && 
              <span className="file-info">
                <button className="btn btn-link">{props.file.data}</button>
              </span> 
            }
        </div>
        }
      </div>
      <Button
          variant="primary"
          block={true}
          icon={<Upload />}
          label="Upload" 
          onClick={props.onSubmit}
          disabled={props.disabled}
        />
    </>
    )
}
UploadImage.propTypes = {
  state: PropTypes.string.isRequired,
  file: PropTypes.object.isRequired,
  onDrop: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default UploadImage