import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CTX } from 'store';
import { Image } from 'react-feather';
import * as moment from 'moment';
import { useDatepicker, START_DATE } from "@datepicker-react/hooks";
import { LoadScript, GoogleMap, Polygon } from '@react-google-maps/api';
import Geocode from "react-geocode";
import { GOOGLE_MAPS_API_KEY } from 'config'
import logo from 'assets/img/logo.png'

import APIService from 'services/backstrap/apiService';
import Toast from 'components/Toast/Toast';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import ListingPhotos from 'components/ListingPhotos'
import Calendar from 'components/Calendar'

import './ViewListing.scss'

const ViewListing = (props) => {
    const [appState, dispatch] = React.useContext(CTX);
    let id = props.match.params.id;
    const token = appState.bs_user.cgo_api_key;
    

    ////////////////////////////
    //Form Defaults & Control//
    //////////////////////////
    const [listing, setListing] = useState({
      name: '',
      addr_street: '',
      addr_city: '',
      addr_state: '',
      addr_zip: '',
      addr_country: '',
      min_booking_days: 1,
      autobooking_on: false,
      daily_rate_usd: 1,
      sportsman_capacity: null,
      weapons_permitted: true,
      overnight_permitted: true,
      pets_permitted: true,
      ohvs_permitted: true,
      parking_info: '',
      availible_season_start: '',
      availible_season_end: '',
      listing_active: false,
      entrance_info: '',
      description: '',
      id: null,
      new_listing: true,
      current_screen: 'location',
      photos: [],
      owner: {},
      amenities: [],
      checkin_time: '15:00',
      checkout_time: '11:00'
    })

    const [booking, setBooking] = useState({
      start_date: '2019-12-25',
      end_date: '2019-12-29'
    })

    const [isOwner, ownerState] = useState(false)

    /////////////////////
    ////Availability////
    ///////////////////
    const [availability, setAvailability] = useState({
      startDate: listing.availible_season_end ? listing.availible_season_end : null, 
      endDate: listing.availible_season_start ? listing.availible_season_start : null,
      focusedInput: START_DATE
    })
    const handleBookingChange = (data) => {
      if (!data.focusedInput) {
        setAvailability({ ...data, focusedInput: START_DATE });
        setListing(prevState => { return {...prevState, availible_season_end: moment(data.startDate).format('YYYY-MM-DD'), availible_season_start: moment(data.endDate).format('YYYY-MM-DD')}})
      } else {
        setAvailability(data);
        setListing(prevState => { return {...prevState, availible_season_end: moment(data.startDate).format('YYYY-MM-DD'), availible_season_start: moment(data.endDate).format('YYYY-MM-DD')}})
      }
    }

    const {
      firstDayOfWeek,
      activeMonths,
      isDateSelected,
      isDateHovered,
      isFirstOrLastSelectedDate,
      isDateBlocked,
      isDateFocused,
      focusedDate,
      onDateHover,
      onDateSelect,
      onDateFocus,
      goToPreviousMonths,
      goToNextMonths
    } = useDatepicker({
      startDate: availability.startDate,
      endDate: availability.endDate,
      focusedInput: availability.focusedInput,
      onDatesChange: handleBookingChange,
      numberOfMonths:  1,
    });


    const goToOwnerProfile = () => props.history.push(`/user/${listing.owner.id}`)

    ////////////////////
    ///////Map/////////
    //////////////////
    const [path, setPath] = useState(props.path);
    const [location, setLocation] = useState({lat: null, lng: null})
    Geocode.setApiKey(GOOGLE_MAPS_API_KEY);
    Geocode.setLanguage('en');
    Geocode.setRegion('us');
    Geocode.enableDebug();

    ///////////////////////////////
    ///////Lease Property/////////
    /////////////////////////////
    const [lease, setLease] = useState({ id: null, hasLease: false})

    const getPriceEstimate = (res) => {
      //get price
      const body = {
        property_id: id,
        start_date: moment(booking.start_date).format('YYYY-MM-DD'),
        end_date: moment(booking.end_date).format('YYYY-MM-DD'),
        daily_rate_usd: res.daily_rate_usd.toString(),
      }
      console.log(body, 'get price body')
      APIService.getPriceEstimate(token, body)
      .then(res => {
        console.log(res, 'price estimate')
      })
      .err(err => {
        console.log(err, 'error getting price estimate')
      })
    }

    const createNewLease = () => {

      const body = {
        property_id: listing.id,
        secondary_lessees: [],
        start_date: moment(booking.start_date).format('YYYY-MM-DD'),
        end_date: moment(booking.end_date).format('YYYY-MM-DD'),
        daily_rate_usd: Number(listing.daily_rate_usd),
        note: 'hi',
        source_token: 'tok_visa'
      }
      console.log(body, 'create new lease')
      APIService.postNewLease(token, body)
      .then(res => {
        console.log(res, 'new lease response')
      })
      .catch(err => {
        console.log(err, 'error creating new lease')
      })

    }

    ////////////////////////
    //Toast Notifications//
    //////////////////////
    const [msg, setMsg] = React.useState({active: false, type: null, data: null})

    ////////////////////
    //On Mount/////////
    //////////////////
    useEffect( () => {
      console.log(id, 'params')
      if(id){
        APIService.getListing(token, id)
        .then((res) => {
          dispatch({type: 'LOADING_DISABLED'})
          console.log(res, listing)
          setListing(res)

          //geocode address for maps
          if(res.complete_geojson && res.complete_geojson.features.length === 0) {
            let address = `${res.addr_street} ${res.addr_city}, ${res.addr_state} ${res.addr_zip}`
            Geocode.fromAddress(address).then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                setLocation({lat: lat, lng})
                setPath([{lat: lat, lng: lng},{lat: lat+.003, lng: lng+.003},{lat: lat+.0007, lng: lng+.00007}])
              },
              error => {
                console.error(error, 'here');
              }
            );
          } else {
            const coords = res.complete_geojson.features[0].geometry.coordinates[0].map(e => {
              return {lat: e[0], lng: e[1]}
            })
            dispatch({type: 'EDIT_MAP_COORDINATES', payload: coords})
            setLocation(coords[0])
            setPath(coords)
          }
          return res
        })
        .then((res) => {
          //getPriceEstimate(res);
          //get property owner
          APIService.getProfileById(token, res.owner_id)
          .then(res =>  {
            if(res.id === appState.bs_user.profile.id) {
              ownerState(true) //it's yer own listing
            }
            setListing(prevState => { return {...prevState, owner: res} }) 
            })
          .catch(err => console.log(err, 'owner id error'))
          
        })
        .catch((err) => { 
          setMsg({active: true, type: 'danger', data: err && err.data ? err.statusText : 'Error Fetching Listing'});
          dispatch({type: 'LOADING_DISABLED'})
        })
      }

    }, [])

    document.title = `${listing && listing.name} - Viewing Listing - Trekker`;

    return (
      <>
      <Header props={props} />
      { (listing.photos && listing.photos.length > 0 ) && <ListingPhotos photos={listing.photos} /> }
      <div className={(listing.photos && listing.photos.length > 0 ) ? `container` : `container m-header`}>
          <div className="row mt-5">
            <div className="col-md-8">
              <h2>{listing.name} <small>{listing.addr_city + ', ' + listing.addr_state}</small></h2>

              <div className="row mt-5">
                <div className="col-sm-3">
                  {listing.owner && listing.owner.id &&
                    <>
                    <img src={listing.owner.profile_img_url ? listing.owner.profile_img_url : logo} alt={listing.owner.first} className="img-thumbnail pointer" onClick={goToOwnerProfile} />
                    
                    <div className="bold mt-2 d-flex flex-column">
                      <span className="btn btn-link p-0 d-flex justify-content-start" onClick={goToOwnerProfile}>{listing.owner.first + ' ' + listing.owner.last}</span>
                      <small>Landowner</small>
                    </div>
                    </>
                  }
                  

                </div>
                <div className="col-sm-9">{listing.description}</div>
              </div>

              {listing.terrain && listing.terrain.length > 0 &&
                <div className="row mt-5 flex-column">
                  <h4>Terrain</h4>
                  <p>Terrain types at this location</p>
                  <div className="row mt-4 mx-0">
                    {listing.terrain.map(e => (
                      <div key={e.id} className="col-sm-4 d-flex flex-column align-items-center justify-content-center py-5 bg-light mb-3">
                        <Image />
                        <strong>{e.name}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              }

              {listing.animals && listing.animals.length > 0 &&
                <div className="row mt-5 flex-column">
                  <h4>Animals</h4>
                  <p>Animals at this location</p>
                  <div className="row mt-3 mx-0">
                    {listing.animals.map(e => (
                      <div key={e.id} className="col-sm-4 d-flex flex-column align-items-center justify-content-center py-5 bg-light mb-3">
                        <Image />
                        <strong>{e.name}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              }
              
              {listing.activities && listing.activities.length > 0 &&
                <div className="row mt-5 flex-column">
                  <h4>Activities</h4>
                  <p>Activities at this location</p>
                  <div className="row mt-4 mx-0">
                    {listing.activities.map(e => (
                      <div key={e.id} className="col-sm-3 d-flex flex-column align-items-center justify-content-center py-5 bg-light mb-3">
                        <Image />
                        <strong>{e.name}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              }

              <div className="row mt-5">
                {listing.weapons && listing.weapons.length > 0 &&
                  <div className="weapons-wrap col-sm-6 px-0">
                  <h4 className="mb-4">Weapons Permitted</h4>
                    {listing.weapons.map(e => (
                      <li key={e.id}>
                        <strong>{e.name}</strong>
                      </li>
                    ))}
                  </div>
                }
                <div className="weapons-wrap col-sm-6 px-0">
                  <h4 className="mb-4">Amenities</h4>
                  {listing.amenities && listing.amenities.length > 0 ? 
                    listing.amenities.map(e => <p className="mb-1">{e}</p>)
                    :
                    <p className="mb-1">
                      No amenities listed
                    </p>
                  }
                </div>
                <div className="my-5">
                  <p><strong>Have a question?</strong> Contact this host</p>
                </div>
              </div>


              <div className="row px-0 border-top py-5">
                <div className="col-sm-6 px-0">
                  <h4 className="mb-4">Details</h4>
                </div>

                <div className="col-sm-6 px-0">
                {listing.pets_permitted && 
                  <p className="mb-1">
                    <strong className="mr-2">Pets Allowed:</strong>
                    <span>{listing.pets_permitted ? 'Yes' : 'No'}</span>
                  </p>
                }
                {listing.sportsman_capacity && 
                  <p className="mb-1">
                    <strong className="mr-2">Max Number of Guests:</strong>
                    <span>{listing.sportsman_capacity}</span>
                  </p>
                }

                {listing.checkin_time &&
                  <p className="mb-1">
                    <strong className="mr-2">Check in:</strong>
                    <span>{moment(listing.checkin_time, 'HH:mm').format('hh:mm A')}</span>
                  </p>
                }

                {listing.checkout_time &&
                  <p className="mb-1">
                    <strong className="mr-2">Check out:</strong>
                    <span>{moment(listing.checkout_time, 'HH:mm').format('hh:mm A')}</span>
                  </p>
                }
                </div>
              </div>


                <div className="row my-5">
                  <h4 className="mb-4">Map</h4>
                  {path ?
                    <LoadScript
                    id="script-loader"
                    googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                    language="en"
                    region="us"
                  >
                    <GoogleMap
                      mapContainerClassName="listing-map-wrap"
                      center={location}
                      zoom={14}
                      version="weekly"
                      on
                    >
                      <Polygon
                        path={path}
                      />
                    </GoogleMap>
                  </LoadScript>
                  : <p>Loading</p>}
                </div>
            </div>

            <div className="col-md-4">
              <Calendar
                numberOfMonths="1"
                startDate={booking.startDate}
                endDate={booking.endDate}
                handleDateChange={handleBookingChange}
                firstDayOfWeek={firstDayOfWeek}
                activeMonths={activeMonths}
                isDateSelected={isDateSelected}
                isDateHovered={isDateHovered}
                isFirstOrLastSelectedDate={isFirstOrLastSelectedDate}
                isDateBlocked={isDateBlocked}
                isDateFocused={isDateFocused}
                focusedDate={focusedDate}
                onDateHover={onDateHover}
                onDateSelect={onDateSelect}
                onDateFocus={onDateFocus}
                goToPreviousMonths={goToPreviousMonths}
                goToNextMonths={goToNextMonths}
              />
              <Button
                className="my-1"
                type="submit"
                variant="primary"
                block={true}
                label="Request This Property" 
                disabled={isOwner ? true : false}
                helpText={isOwner ? 'You are viewing your own property' : null}
                onClick={createNewLease}
              />
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

export default ViewListing;
