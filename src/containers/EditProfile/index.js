import React, { useState, useEffect } from 'react';
import { CTX } from 'store';
import { Plus } from 'react-feather';
import { Eye } from 'react-feather';
import APIService from 'services/backstrap/apiService';
import Toast from 'components/Toast/Toast';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import TitleBar from 'components/TitleBar/TitleBar';
import EditProfileForm from 'components/EditProfileForm/EditProfileForm';
import UploadImage from 'components/UploadImage/UploadImage';

const EditProfile = (props) => {

    document.title = `Edit Profile - Trekker`;

    const [appState, dispatch] = React.useContext(CTX);
    const token = appState.bs_user.cgo_api_key;
    //Edit Profile Form
    const [profile, setProfile] = useState({
      first: appState.bs_user.profile && (appState.bs_user.profile.first || ''),
      last: appState.bs_user.profile && (appState.bs_user.profile.last || ''),
      email: appState.bs_user.profile && (appState.bs_user.profile.email || ''),
      phone: appState.bs_user.profile && (appState.bs_user.profile.phone || ''),
      addr_street: appState.bs_user.profile && (appState.bs_user.profile.addr_street || ''),
      addr_city: appState.bs_user.profile && (appState.bs_user.profile.addr_city || ''),
      addr_state: appState.bs_user.profile && (appState.bs_user.profile.addr_state || ''),
      addr_zip: appState.bs_user.profile && (appState.bs_user.profile.addr_zip || ''),
      profile_img_url: appState.bs_user.profile && (appState.bs_user.profile.profile_img_url || null),
    })
    const handleProfileChange = e => setProfile({ ...profile, [e.target.name]: e.target.value})
    const handleSelect = (e, state) => { if(e !== null) { console.log(e.value, state, profile); setProfile({ ...profile, [state]: e.value}) } }
    const submitPatchProfile = e => {
      e.preventDefault();
      const patchProfile = {
        first: profile.first,
        last: profile.last,
        email: profile.email,
        phone: profile.phone,
        addr_street: profile.addr_street,
        addr_city: profile.addr_city,
        addr_state: profile.addr_state,
        addr_zip: profile.addr_zip
      }
      dispatch({type: 'LOADING_ENABLED'})
      APIService.patchProfile(token, patchProfile)
      .then((res) => {
        console.log(res, 'profile submitted')
        dispatch({type: 'LOADING_DISABLED'})
        setMsg({active: true, type: 'success', data: 'Profile Updated'})
        setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
      })
      .catch((err) => { 
        console.log(err, 'error submitting')
        err && err.data ? 
          setMsg({active: true, type: 'danger', data: err.data.message}) : 
          setMsg({active: true, type: 'danger', data: 'Error Loading Profile'})

        dispatch({type: 'LOADING_DISABLED'})
      })  
    }

    //Upload/Edit Profile Image
    const initImgState = { 
      file: {
        data: null,
        base64String: null,
        ext: null
      }, 
      state: 'ready' 
    };
    const [profileImg, setProfileImg] = useState(initImgState);

    const onDrop = React.useCallback(
      files => {
        var file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          setProfileImg({
            ...profileImg, 
            file: { 
              data: file, 
              base64String: event.target.result, 
              ext: file.type.split('/').slice(-1)[0]
            }
          })
        };
        reader.readAsDataURL(file);
      }, 
      [profileImg]
    );
    const uploadProfileImage = () => {
        const body = {
            body: profileImg.file.base64String,
            ext: profileImg.file.ext
        };
        setProfileImg({...profileImg, state: 'uploading'})
        APIService.postProfileImage(token, body)
        .then((res) => {
          console.log(res, 'uploaded image')
          dispatch({type: 'UPDATE_PROFILE_IMAGE', payload: res.profile_img_url});
          setProfile({...profile, profile_img_url: res.profile_img_url });
          setProfileImg({...profileImg, state: 'success'});
          setTimeout(() => setProfileImg(initImgState), 1000)
        })
        .catch((err) => { 
          setProfileImg({...profileImg, state: 'error'})
          setMsg({active: true, type: 'danger', data: `Error Uploading - ${err}`})
          setTimeout(() => setProfileImg(initImgState), 2000)
        });
      }
    
    //Toast Notifications
    const [msg, setMsg] = React.useState({active: false, type: null, data: null})

    useEffect( () => {
      APIService.getProfile(token)
      .then((res) => {
        console.log(res, 'profile')
        dispatch({type: 'LOADING_DISABLED'})
        dispatch({type: 'GET_PROFILE_DETAILS', payload: res})
        setProfile(res)
      })
      .catch((err) => { 
        err && err.data ? 
          setMsg({active: true, type: 'danger', data: err.data.message}) : 
          setMsg({active: true, type: 'danger', data: 'Error Loading Profile'})
        
        dispatch({type: 'LOADING_DISABLED'})
      })  
    }, [])


    return (
      <>
      <Header props={props} />
      <TitleBar
        title={'Edit Profile'}
        buttonPrimary={
          <Button 
            variant="outline-light" 
            block={false} 
            className="ml-3" 
            icon={<Eye />}
            label="View Profile" 
            onClick={() => props.history.push(`/user/${profile.id}`)}
          />
        }
      />
      <div className="container">
        <div className="col-sm-12 mt-5">

          <div className="row">
            <div className="col-md-3 mb-5">
              <UploadImage
                onDrop={onDrop}
                onSubmit={uploadProfileImage}
                state={profileImg.state}
                file={profileImg.file}
                disabled={profileImg.file.base64String !== null ? false : true}
                image={appState.bs_user.profile &&  appState.bs_user.profile.profile_image ? appState.bs_user.profile.profile_image : profile.profile_img_url}
              />
            </div>

            <div className="col-md-6 mb-5">
              <EditProfileForm
                onSubmit={submitPatchProfile}
                onChange={handleProfileChange}
                onAddrStateChange={(e) => { handleSelect(e, 'addr_state'); console.log(e); } }
                first={profile.first}
                last={profile.last}
                email={profile.email}
                phone={profile.phone}
                addr_street={profile.addr_street}
                addr_city={profile.addr_city}
                addr_state={profile.addr_state}
                addr_zip={profile.addr_zip}
              />
            </div>
            
            <div className="col-md-3 mb-5">
              <h4 className="mb-4">Host your property</h4>
              <Button 
                variant="outline-primary" 
                label="Add Listing" 
                block={true} 
                icon={<Plus/>} 
                onClick={()=>props.history.push('/listing/create')}
              />
            </div>
          </div>

        </div>
      </div>
      { msg.active && 
        <Toast 
          message={msg.data} 
          type={msg.type} 
          active={msg.active} 
          close={() => setMsg({active: false, type: null, data: null})} 
          />
      }
      </>
    );

}

export default EditProfile;
