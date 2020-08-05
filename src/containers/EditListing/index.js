import React, { useState, useEffect } from 'react';
import { CTX } from 'store';
import { Eye, Save, X } from 'react-feather';
import * as moment from 'moment';
import Geocode from "react-geocode";
import { GOOGLE_MAPS_API_KEY } from 'config'

import APIService from 'services/backstrap/apiService';
import Toast from 'components/Toast/Toast';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import TitleBar from 'components/TitleBar/TitleBar';
import CardProperty from 'components/CardProperty'
import Switch from 'components/Switch/Switch';
import EditListingLocation from 'components/EditListingLocation/EditListingLocation';
import EditListingPhotos from 'components/EditListingPhotos/EditListingPhotos';
import EditListingBookingOptions from 'components/EditListingBookingOptions'
import EditListingFeatures from 'components/EditListingFeatures'
import EditListingPricing from 'components/EditListingPricing'
import EditListingAdditionalInfo from 'components/EditListingAdditionalInfo'
import EditListingAvailability from 'components/EditListingAvailability'
import EditListingMap from 'components/EditListingMap'
import './EditListing.scss'

import { useDatepicker, START_DATE } from "@datepicker-react/hooks";

const EditListing = (props) => {
    const [appState, dispatch] = React.useContext(CTX);
    const id = props.match.params.id;
    const token = appState.bs_user.cgo_api_key;
    
    ////////////////////////////
    //Form Defaults & Control//
    //////////////////////////
    const initState = {
      name: '',
      addr_street: '',
      addr_city: '',
      addr_state: '',
      addr_zip: '',
      addr_country: '',
      //water_fixture: false,
      min_booking_days: 1,
      autobooking_on: false,
      daily_rate_usd: 1,
      sportsman_capacity: 1,
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
      checkin_time: '13:00',
      checkout_time: '11:00',
      amenities: [],
    }
    const [listing, setListing] = useState(initState)
    const handleChange = e =>  setListing({ ...listing, [e.target.name]: e.target.value})
    const handleSelect = (e, state) =>  e !== null && setListing({ ...listing, [state]: e.value})
  
    const saveListing = (e) => {
      e.preventDefault();
      const body = {
        name: listing.name,
        addr_street: listing.addr_street,
        addr_city: listing.addr_city,
        addr_state: listing.addr_state,
        addr_zip: listing.addr_zip,
        addr_country: listing.addr_country,
        entrance_info: listing.entrance_info,
        description: listing.description
      }
      //patch or post
      if(listing.id && listing.new_listing === false) {
        const patchBody = listing;
        patchBody.id = listing.id;
        patchBody.amenities = features.selectedAmenities && features.selectedAmenities.length > 0 ? features.selectedAmenities.map(e => e.text) : null;
        console.log(patchBody, 'real patch body')
        APIService.patchListing(token, patchBody)
        .then((res) => {
          console.log(res, 'patch res')
          setMsg({active: true, type: 'primary', data: `Listing Updated`})
          setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
        })
        .catch(err => {
          setMsg({active: true, type: 'danger', data: `Error Updating Listing - ${err}`})
        })
      } else {
        APIService.postListing(token, body)
        .then((res) => {
          console.log(res, 'success creating listing')
          return res
        })
        .then((res) => props.history.push(`/listing/edit/${res.id}`, { ...res, current_screen: 'photos' }))
        .catch((err) => {
          console.log(err, 'error creating listing')
          setMsg({active: true, type: 'danger', data: `Error Creating Listing - ${err}`})
        })
      }
    }

    const waterFixtureToggle = () => {
      setListing({...listing, water_fixture: !listing.water_fixture})
      APIService.patchListing(token, { id: listing.id, water_fixture: !listing.water_fixture})
      .then((res) => {
        setMsg({active: true, type: 'primary', data: `Water Fixture Updated`})
        setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
      })
      .catch(err => {
        setListing({...listing, water_fixture: !listing.water_fixture})
        setMsg({active: true, type: 'danger', data: `Error Updating Listing - ${err}`})
      })
    }

    const togglePublish = () => {
      setListing({...listing, listing_active: !listing.listing_active})
      APIService.patchListing(token, { id: listing.id, listing_active: !listing.listing_active})
      .then((res) => {
        setMsg({active: true, type: 'primary', data: `Listing Updated`})
        setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
      })
      .catch(err => {
        setListing({...listing, listing_active: !listing.listing_active})
        setMsg({active: true, type: 'danger', data: `Error Updating Listing - ${err}`})
      })
    }

    const nextStep = (step) =>  setListing({...listing, current_screen: step})
    const viewListing = () => props.history.push(`/property/${id}`)
    const cancelClicked = () =>  {
      setListing(initState)
      props.history.push('/')
    }


    document.title = `${listing.new_listing ? 'Create Listing' : 'Edit Listing'} - Trekker`;

    ////////////////////////////////////////////////////
    //Upload Featured & Additional Images for Listing//
    //////////////////////////////////////////////////
    const initImg = { 
      file: {
        data: null,
        base64String: null,
        ext: null
      }, 
      state: 'ready',
      src: null
    };
    const [mainImg, setMainImg] = useState(initImg);
    const onDrop = React.useCallback(
      files => {
        var file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          setMainImg({
            ...mainImg, 
            file: { 
              data: file, 
              base64String: event.target.result, 
              ext: file.type.split('/').slice(-1)[0]
            }
          })
        };
        reader.readAsDataURL(file);
      }, 
      [mainImg]
    );
    const [addImg, setAddImg] = useState(initImg);
    const onDrop2 = React.useCallback(
      files => {
        var file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          setAddImg({
            ...addImg, 
            file: { 
              data: file, 
              base64String: event.target.result, 
              ext: file.type.split('/').slice(-1)[0]
            }
          })
        };
        reader.readAsDataURL(file);
      }, 
      [addImg]
    );
    const uploadImage = (feature) => {
        const body = {
          file: { 
              body: feature === true ? mainImg.file.base64String : addImg.file.base64String,
              ext: feature === true ? mainImg.file.ext : addImg.file.ext, 
          },
          featured: feature === true ? true : false,
          property_id: id ? id : null,
        };

        feature && feature === true ? 
          setMainImg({...mainImg, state: 'uploading'}) : 
          setAddImg({...addImg, state: 'uploading'});

        APIService.postListingPhoto(token, body)
        .then((res) => {
          console.log(res, 'uploaded image')
          let arr = listing.photos;
          arr.push(res)
          setListing(prevState => { return {...prevState, photos: arr}})

          if(feature && feature === true) { 
            setMainImg({...mainImg, state: 'success'})
            setTimeout(() => setMainImg({ ...mainImg, state: 'ready', src: res.src }), 666)
          } else {
            setAddImg({...addImg, state: 'success'})
            setTimeout(() => setAddImg({ ...addImg, state: 'ready', src: res.src }), 666)
          }
        })
        .catch((err) => {
          if(feature && feature === true) { 
            setMainImg({...mainImg, state: 'error'})
            setTimeout(() => setMainImg(initImg), 2000)
          } else {
            setAddImg({...addImg, state: 'error'})
            setTimeout(() => setAddImg(initImg), 2000)
          }
          setMsg({active: true, type: 'danger', data: `Error Uploading - ${err}`})
        });
      }
    
    const deleteImage = (e) => {
      e.preventDefault()
      const body = { photo_id: e.target.value };
      let arr = listing.photos.filter(data => data.id !== e.target.value);
      APIService.deleteListingPhoto(token, body)
      .then(res => {
        console.log(res, 'deleted image')
        setListing(prevState => { return {...prevState, photos: arr}})
        setMsg({active: true, type: 'primary', data: `Photo deleted`})
        setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
      })
      .catch(err => {
        console.log(err, 'error deleting')
        setMsg({active: true, type: 'danger', data: `Error Deleting Image - ${err}`})
      })
    }

    /////////////////////
    ////Availability////
    ///////////////////
    const [availability, setAvailability] = useState({
      startDate: listing.availible_season_end ? listing.availible_season_end : null, 
      endDate: listing.availible_season_start ? listing.availible_season_start : null,
      focusedInput: START_DATE
    })
    const handleAvailabilityChange = (data) => {
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
      onDatesChange: handleAvailabilityChange,
      numberOfMonths:  2,
    });

    /////////////
    //Features//
    ///////////
    const [attributes, setAttributes] = useState({
      terrain: [],
      weapons: [],
      animals: [],
      activities: [],
      selectedTerrain:  null,
      selectedWeapons: null,
      selectedActivities: null,
      selectedAnimals: null
    })


    const addFeatures = (e) => {
      e.preventDefault()
      if(attributes.selectedTerrain && attributes.selectedTerrain.length > 0) {
        APIService.patchPropertyAttributes(token,{
          property_id: id,
          //add_attributes: false,
          attribute_ids: attributes.selectedTerrain.map(e => e.id),
          attribute_type: 'terrain'
        })
        .then((res) => {
          console.log(res, 'updated terrain')
          setMsg({active: true, type: 'primary', data: `Terrain Updated`})
          setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
        })
        .catch((err)=>console.log(err, 'err updating'))
      }

      if(attributes.selectedAnimals && attributes.selectedAnimals.length > 0) {
        APIService.patchPropertyAttributes(token,{
          property_id: id,
          //add_attributes: false,
          attribute_ids: attributes.selectedAnimals.map(e => e.id),
          attribute_type: 'animals'
        })
        .then((res) => {
          console.log(res, 'updated animals')
          setMsg({active: true, type: 'primary', data: `Animals Updated`})
          setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
        })
        .catch((err)=>console.log(err, 'err updating'))
      }

      if(attributes.selectedWeapons && attributes.selectedWeapons.length > 0) {
        APIService.patchPropertyAttributes(token,{
          property_id: id,
          //add_attributes: false,
          attribute_ids: attributes.selectedWeapons.map(e => e.id),
          attribute_type: 'weapons'
        })
        .then((res) => {
          console.log(res, 'updated weapons')
          setMsg({active: true, type: 'primary', data: `Weapons Updated`})
          setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
        })
        .catch((err)=>console.log(err, 'err updating'))
      }

      if(attributes.selectedActivities && attributes.selectedActivities.length > 0) {
        APIService.patchPropertyAttributes(token,{
          property_id: id,
          attribute_ids: attributes.selectedActivities.map(e => e.id),
          attribute_type: 'activities'
        })
        .then((res) => {
          console.log(res, 'updated activities')
          setMsg({active: true, type: 'primary', data: `Activities Updated`})
          setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
        })
        .catch((err)=>console.log(err, 'err updating'))
      }
    }

    const deleteFeature = (item, type) => {
      console.log(item, type)
      APIService.patchPropertyAttributes(token,{
        property_id: id,
        add_attributes: false,
        attribute_ids: [item.id],
        attribute_type: type
      })
      .then((res) => {
        console.log(res, 'updated terain')
        setMsg({active: true, type: 'primary', data: `${item.name} removed`})
        setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
      })
      .catch((err)=>console.log(err, 'err updating'))
    
    }

    const handleAttributeChange = (items, type) => {
      console.log(items, type)
      let tmp;
      let selected;
      switch(type) {
        case 'terrain':
          selected = 'selectedTerrain'
          tmp = attributes.selectedTerrain;
          tmp.push(items)
          break;
        case 'weapons':
          selected = 'selectedWeapons'
          break;
        case 'activities':
          selected = 'selectedActivities'
          break;
        case 'animals':
          selected = 'selectedAnimals'
          break;
        default:
            throw Error('no type specified')
      }
      setAttributes({...attributes, [selected]: items})
    }

    /////////////
    //Features//
    ///////////
    const [features, setFeatures] = useState({
      amenities: [{id: 'PortableWater', text: 'Portable Water'}, {id: 'Kitchen', text: 'Kitchen'}, {id: 'Showers', text: 'Showers'}, {id: 'Picnic Table', text: 'Picnic Table'}, {id: 'Bins', text: 'Bins'}],
      selectedAmenities: []
    })
    const deleteAmenity = (i) => {
      const { selectedAmenities } = features;
      const patchBody = listing;
      patchBody.amenities = selectedAmenities.filter((e, index) => index !== i).map(e => e.text);

      APIService.patchListing(token, patchBody)
      .then(res => {
        console.log(patchBody.amenities, 'amenities posted')
        console.log(res, 'deleted')
        setMsg({active: true, type: 'primary', data: `Amenity removed`})
        setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
        setFeatures(prevState => { 
          return {
            ...prevState,
            selectedAmenities: selectedAmenities.filter((e, index) => index !== i)
          }
        });
      })
      .catch(err => {
        console.log(err)
        setMsg({active: true, type: 'danger', data: `Error deleting`})
        setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
      })

    }
    
    const addAmenity = (amn) => {
     //this.setState(state => ({ tags: [...state.tags, tag] }));
     setFeatures(prevState => { 
      return {
        ...prevState,
        selectedAmenities: [...prevState.selectedAmenities, amn]
      }
    });
    }
    
    const amenityClicked = (index) => {
      console.log('The tag at index ' + index + ' was clicked');
    }
    ////////////////////////
    //Map//////////////////
    //////////////////////
    Geocode.setApiKey(GOOGLE_MAPS_API_KEY);
    Geocode.setLanguage('en');
    Geocode.setRegion('us');
    Geocode.enableDebug();
    const [location, setLocation] = useState(appState.editMap.coordinates.length > 0 ? appState.editMap.coordinates[0] : {lat: null, lng: null})
    const [path, setPath] = useState([])
    const updateGeocode = (e) => {
      e.preventDefault();

      const body = {
        property_id: listing.id,
        coordinates: appState.editMap.coordinates.map(p => [p.lat, p.lng]),
        geojson_id: listing.geojson_id ? listing.geojson_id : null
      }
      console.log(body)
      dispatch({type: 'LOADING_ENABLED'})
      APIService.postPropertyGeocode(token, body)
      .then((res) => {
        console.log(res, 'posted geojson')
        dispatch({type: 'LOADING_DISABLED'})
        setMsg({active: true, type: 'primary', data: `Map Updated`})
        setTimeout(() => setMsg({active: false, type: null, data: null}), 2000)
      })
      .catch(err => {
        setMsg({active: true, type: 'danger', data: err ? err : 'Error posting geocode'});
        dispatch({type: 'LOADING_DISABLED'})
      })
    }

    ////////////////////////
    //Toast Notifications//
    //////////////////////
    const [msg, setMsg] = React.useState({active: false, type: null, data: null})

    ///////////////////////////
    /////////On Mount/////////
    //////////////////////////
    useEffect( () => {
      //get and set existing listing
      if(id){
        dispatch({type: 'EDIT_MAP_COORDINATES', payload: [{
          lat: null,
          lng: null
      }]})
        APIService.getListing(token, id)
        .then((res) => {
          console.log(res, 'existing listing')
          dispatch({type: 'LOADING_DISABLED'})
          //set listing details
          setListing(res)

          //set listing attributes
          res.terrain && setAttributes(prevState => { return {...prevState, selectedTerrain: res.terrain }})
          res.animals && setAttributes(prevState => { return {...prevState, selectedAnimals: res.animals }})
          res.weapons && setAttributes(prevState => { return {...prevState, selectedWeapons: res.weapons }})
          res.activities && setAttributes(prevState => { return {...prevState, selectedActivities: res.activities }})
          //set selected amenities
          res.amenities && setFeatures(prevState => { return {
            ...prevState,
            selectedAmenities: res.amenities && res.amenities.length > 0 ? res.amenities.map(e => {
              return {
                id: e,
                text: e,
              }
            }) : []
          }})
          
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
        })
        .then(() => 
          setListing( prevState => { return {...prevState, current_screen: 'photos', new_listing: false }})
        )
        .catch((err) => { 
          setMsg({active: true, type: 'danger', data: err && err.data ? err.statusText : 'Error Fetching Listing'});
          dispatch({type: 'LOADING_DISABLED'})
        })
      }
    }, [])

    useEffect( () => {
      //get and setproperty attributes
      APIService.getPropertyAttributes(token, 'terrain').then(res => setAttributes(prevState => { return { ...prevState, terrain: res} }) ).catch(err => console.log(err, 'err attr'))
      APIService.getPropertyAttributes(token, 'weapons').then(res => setAttributes(prevState => { return { ...prevState, weapons: res} }) ).catch(err => console.log(err, 'err attr'))
      APIService.getPropertyAttributes(token, 'animals').then(res => setAttributes(prevState => { return { ...prevState, animals: res} }) ).catch(err => console.log(err, 'err attr'))
      APIService.getPropertyAttributes(token, 'activities').then(res => setAttributes(prevState => { return { ...prevState, activities: res} }) ).catch(err => console.log(err, 'err attr'))
    }, [])

    useEffect( () => {

    }, [])
    return (
      <>
      <Header props={props} />
      <TitleBar
        title={listing.new_listing === true ? `Create Listing` : `Editing Listing: ${listing.name}`}
        buttonPrimary={
          <Button 
            variant="primary" 
            label="Save" 
            block={false} 
            icon={<Save/>} 
            className="ml-3" 
            onClick={saveListing}
            disabled={listing.new_listing === true ? true : false}
          />
        }
        buttonSecondary={
          <Button
            variant="outline-light"
            label="Cancel"  
            block={false}  
            icon={<X/>} 
            disabled={listing.new_listing === true ? true : false}
            onClick={cancelClicked}
          />
        }
      />

      <div className="container">
        <div className="col-sm-12 mt-5">

          <div className="row">
            <div className="col-md-3">
              <h4 className="mb-0 text-muted d-flex flex-column align-items-start">
                {listing.name ? listing.name : 'Untitled Listing'}
              </h4>
              {listing.new_listing === false && 
                  <>
                  <button className="btn btn-link px-0 mb-4" onClick={viewListing}>View Listing</button>
                  <Switch
                    id="listing_active"
                    className="mb-4 published-wrap"
                    label="Published:"
                    icons="true"
                    defaultChecked={listing.listing_active}
                    helpText={listing.listing_active ? 'This listing is active' : 'This listing is a draft'}
                    onChange={togglePublish}
                    />                   
                  </>
                }
              <nav id="edit-listing-nav" className="d-flex flex-column align-items-start">
                <button 
                  className={`btn btn-link ${listing.current_screen === 'location' && 'active'}`}
                  onClick={() => nextStep('location')}>Location</button>
                <button
                  disabled={listing.new_listing === true ? true : false}
                  className={`btn btn-link ${listing.current_screen === 'photos' && 'active'}`}
                  onClick={() => nextStep('photos')}>Photos</button>
                <button 
                  disabled={listing.new_listing === true ? true : false}
                  className={`btn btn-link ${listing.current_screen === 'booking' && 'active'}`}
                  onClick={() => nextStep('booking')}>Booking Options</button>
                <button 
                  disabled={listing.new_listing === true ? true : false}
                  className={`btn btn-link ${listing.current_screen === 'features' && 'active'}`}
                  onClick={() => nextStep('features')}>Features</button>
                <button 
                  disabled={listing.new_listing === true ? true : false}
                  className={`btn btn-link ${listing.current_screen === 'pricing' && 'active'}`}
                  onClick={() => nextStep('pricing')}>Pricing</button>
                <button 
                  disabled={listing.new_listing === true ? true : false}
                  className={`btn btn-link ${listing.current_screen === 'additional_info' && 'active'}`}
                  onClick={() => nextStep('additional_info')}>Additional Info</button>
                <button 
                  disabled={listing.new_listing === true ? true : false}
                  className={`btn btn-link ${listing.current_screen === 'availability' && 'active'}`}
                  onClick={() => nextStep('availability')}>Availability</button>
                <button 
                  disabled={listing.new_listing === true ? true : false}
                  className={`btn btn-link ${listing.current_screen === 'map' && 'active'}`}
                  onClick={() => nextStep('map')}>Map</button>
              </nav>
            </div>

            <div className="col-md-6">
            { listing.current_screen === 'location' &&
              <EditListingLocation
                onSubmit={saveListing}
                onChange={handleChange}
                onAddrStateChange={(e) => handleSelect(e, 'addr_state')}
                onAddrCountryChange={(e) => handleSelect(e, 'addr_country')}
                addr_street={listing.addr_street}
                addr_city={listing.addr_city}
                addr_state={listing.addr_state}
                addr_zip={listing.addr_zip}
                addr_country={listing.addr_country}
                entrance_info={listing.entrance_info}
                name={listing.name}
                description={listing.description}
              />
            }

            { listing.current_screen === 'photos' &&
              <EditListingPhotos
                onSubmit={() => nextStep('booking')}
                onMainDrop={onDrop}
                onMainSubmit={() => uploadImage(true)}
                onDelete={deleteImage}
                mainState={mainImg}
                onAddDrop={onDrop2}
                onAddSubmit={() => uploadImage(false)}
                addState={addImg}
                photos={listing.photos}
              />
            }

            { listing.current_screen === 'booking' &&
              <EditListingBookingOptions
                autoBooking={listing.autobooking_on}
                sportsmanCapacity={listing.sportsman_capacity}
                minBookingDays={listing.min_booking_days}
                overnightAllowed={listing.overnight_permitted}
                onSwitch={(e) =>  {
                  console.log(e.target.name, e.target.value)
                  e.target.name === 'autobooking_on' ?
                    setListing({...listing, autobooking_on: !listing.autobooking_on})
                    :
                    setListing({...listing, overnight_permitted: !listing.overnight_permitted})
                  
                }}
                onChange={handleChange}
                onSubmit={saveListing}
                />
            }
            
            { listing.current_screen === 'features' &&
              <EditListingFeatures
                attributes={attributes}
                handleTagDelete={deleteFeature}
                handleTerrainChange={(items) => handleAttributeChange(items, 'terrain')}
                handleAnimalsChange={(items) => handleAttributeChange(items, 'animals')}
                handleWeaponsChange={(items) => handleAttributeChange(items, 'weapons')}
                handleActivitiesChange={(items) => handleAttributeChange(items, 'activities')}
                onSubmit={addFeatures}
              />
            }

            { listing.current_screen === 'pricing' &&
              <EditListingPricing
                onChange={handleChange}
                price={listing.daily_rate_usd}
                onSubmit={saveListing}
              />
            }

            { listing.current_screen === 'additional_info' &&
              <EditListingAdditionalInfo
                onChange={handleChange}
                onSubmit={saveListing}
                onSwitch={(e) => setListing({...listing, [e.target.name]: e.target.checked})}
                weapons_permitted={listing.weapons_permitted}
                parking_info={listing.parking_info}
                pets_permitted={listing.pets_permitted}
                ohvs_permitted={listing.ohvs_permitted}
                selectedAmenities={features.selectedAmenities}
                amenities={features.amenities}
                deleteAmenity={deleteAmenity}
                addAmenity={addAmenity}
                amenityClicked={amenityClicked}
              />
            }

            { listing.current_screen === 'availability' &&
              <EditListingAvailability
                checkInTime={listing.checkin_time}
                checkOutTime={listing.checkout_time}
                onTimeChange={handleChange}
                startDate={listing.availible_season_end}
                endDate={listing.availible_season_start}
                onChange={handleAvailabilityChange}
                onSubmit={saveListing}
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
            }

            { (listing.current_screen === 'map' && path.length > 0) &&
              <EditListingMap
                onChange={handleChange}
                onSubmit={updateGeocode}
                location={location}
                path={path}
              />
            }
            </div>
            
            <div className="col-md-3">
              {!listing.new_listing &&
              <CardProperty
                name={listing.name}
                description={'This is a listing preview. Click to view'}
                photos={listing.photos}
                editLink={false}
                onClick={() => props.history.push(`/property/${listing.id}`)}
              />
              }
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

export default EditListing;
