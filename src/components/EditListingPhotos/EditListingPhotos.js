import React, {useState} from 'react'
import UploadImage from 'components/UploadImage/UploadImage';
import Button from 'components/Button/Button';
import { Camera, Trash2 } from 'react-feather';
import './EditListingPhotos.scss';

const EditListingPhotos = (props) => {
    const [state, setState] = useState({featuredUploadActive: false, additionalUploadActive: false})
    return (
        <form className="mb-5" onSubmit={props.onSubmit}>
        <h4 className="mb-5">Upload Photos</h4>
        <strong className="mb-3 d-flex">Photo Guidelines</strong>
        <p className="mb-5">Featured photos will show up on listing previews, and any additional images will show up on the full listing detail.</p>

        <strong className="mb-3 d-flex">Featured Photos</strong>
        { (props.photos && props.photos.length > 0) &&
            <div className="row mb-3 img-list featured">
            {props.photos.filter(p => p.featured === true).map((e) => {
                return <div className="col-sm-3 mb-3 img-wrap" key={e.id}>
                        <button className="btn btn-sm delete-btn" value={e.id} onClick={props.onDelete}>&times;</button>
                        <img src={e.src} className="img-thumbnail" alt="Listing"/>
                        </div>
            })}
            </div>
        }

        { props.photos && props.photos.length > 0 ? 
            state.featuredUploadActive === false ?
                <Button variant="primary"  label="Add More Featured Photos" block={true} icon={<Camera/>} onClick={() => setState({...state, featuredUploadActive: true})} />
                :
                <UploadImage
                onDrop={props.onMainDrop}
                onSubmit={props.onMainSubmit}
                state={props.mainState.state}
                file={props.mainState.file}
                disabled={props.mainState.file.base64String !== null ? false : true}
                
                />
            :
            <UploadImage
                onDrop={props.onMainDrop}
                onSubmit={props.onMainSubmit}
                state={props.mainState.state}
                file={props.mainState.file}
                disabled={props.mainState.file.base64String !== null ? false : true}
                
                />
        }

        <strong className="mt-5 mb-3 d-flex">Photos of your listing</strong>
        { (props.photos && props.photos.length > 0) &&
            <div className="row mb-3 img-list additional">
            {props.photos.filter(p => p.featured === false).map((e) => {
                return <div className="col-sm-3 mb-3 img-wrap" key={e.id}>
                        <button className="btn btn-sm delete-btn" value={e.id} onClick={props.onDelete}>&times;</button>
                        <img src={e.src} className="img-thumbnail" alt="Listing"/>
                        </div>
            })}
            </div>
        }
        { props.photos && props.photos.length > 0 ? 
            state.additionalUploadActive === false ?
                <Button variant="primary"  label="Add Additional Photos" block={true} icon={<Camera/>} onClick={() => setState({...state, additionalUploadActive: true})} />
                :
                <UploadImage
                onDrop={props.onAddDrop}
                onSubmit={props.onAddSubmit}
                state={props.addState.state}
                file={props.addState.file}
                disabled={props.addState.file.base64String !== null ? false : true}
                
                />
            :
                <UploadImage
                onDrop={props.onAddDrop}
                onSubmit={props.onAddSubmit}
                state={props.addState.state}
                file={props.addState.file}
                disabled={props.addState.file.base64String !== null ? false : true}
                
                />
        }
        </form>
    )
}

export default EditListingPhotos