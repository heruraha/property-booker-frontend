import React, { useState, useEffect } from 'react';
import { CTX } from 'store';
import { User, MapPin, CheckCircle } from 'react-feather';
import * as moment from 'moment'

import APIService from 'services/backstrap/apiService';
import Toast from 'components/Toast/Toast';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import CardProperty from 'components/CardProperty'

const EditProfile = (props) => {

    document.title = `View Profile - Trekker`;

    const [appState, dispatch] = React.useContext(CTX);
    const token = appState.bs_user.cgo_api_key;
    let id = props.match.params.id;

    //Edit Profile Form
    const [profile, setProfile] = useState({
      first:  '',
      last: '',
      email: '',
      phone: '',
      addr_street: '',
      addr_city: '',
      addr_state: '',
      addr_zip: '',
      profile_img_url: null,
    })

    const [properties, setProperties] = useState([])
    const [isOwner, ownerState] = useState(false)

    //Toast Notifications
    const [msg, setMsg] = React.useState({active: false, type: null, data: null})

    useEffect( () => {
      if(id === appState.bs_user.profile.id) {
        ownerState(true) 
      }

      APIService.getProfileById(token, id)
      .then((res) => {
        console.log(res, 'profile')
        dispatch({type: 'LOADING_DISABLED'})
        setProfile(res)
      })
      .catch((err) => { 
        //console.log(err)
        setMsg({active: true, type: 'danger', data: 'Error Loading Profile'})
        dispatch({type: 'LOADING_DISABLED'})
      })

      APIService.getProperties(token)
      .then((res) => {
        console.log(res)
        setProperties(res)
      })
      .catch(err => {
        console.log(err)
        setMsg({active: true, type: 'danger', data: 'Error Loading Properties'})
        dispatch({type: 'LOADING_DISABLED'})   
      })
    }, [])


    return (
      <>
      <Header props={props} />
      <div className="container m-header">


        <div className="col-sm-12 mt-5">

          <div className="row pt-5">
            <div className="col-md-3 mb-5">
              {profile && profile.profile_img_url ?
                <img src={profile.profile_img_url} className="full-width rounded-circle" alt="User"/>
                :
                <div className="profile-img-blank"><User /></div>
              }
              <p className="text-muted mt-4">Member Since {moment(profile.created_at).format('YYYY')}</p>
            { isOwner === true && <Button variant="primary" label="Edit Profile" block={true} onClick={() => props.history.push(`/profile/edit`)} /> }
            </div>
            <div className="col-md-8 offset-md-1 mb-5">
              <div className="row contact-info mb-5">
                <div className="col-sm-6">
                  <h2 className="mb-4">
                    {`${profile.first} ${profile.last}`}
                    <small><MapPin className="mr-1" size="16" /> {profile.addr_city && profile.addr_city}{profile.addr_state && `, ${profile.addr_state}`}</small>
                  </h2>
                  <Button variant="outline-primary" label="Contact" />
                </div>
                <div className="col-sm-6">
                  {profile && <strong className="mb-3 d-block green">VERIFIED <CheckCircle /></strong>}
                  {profile && <span className="mb-2 d-block">E-mail Address <CheckCircle size="16" /></span>}
                  {profile.phone && <span className="mb-2 d-block">Phone Number <CheckCircle size="16" /></span>}
                  {profile.hunter_id && <span className="mb-2 d-block">Hunter Safety Card <CheckCircle size="16" /></span>}
                </div>
              </div>
              <div className="row property-listings-wrap">
                <div className="col-sm-12">
                  <h2 className="mb-5">Property Listings</h2>
                  <div className="row">
                  {
                    properties.length > 0 ?
                    properties.map( (e,i) =>  {

                      return (
                      <div className="col-sm-6 mb-4" key={i}>
                        <CardProperty
                          name={e.name}
                          description={e.description}
                          img={e.img ? e.img : null}
                          editLink={isOwner ? () => props.history.push(`/listing/edit/${e.id}`) : null}
                          onClick={() => props.history.push(`/property/${e.id}`)}
                          photos={e.photos}
                        />
                      </div>
        
                      )
                    })
                    :
                    <p className="px-3">This user has no properties listed.</p>
                  }
                  </div>
                </div>
              </div>
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
