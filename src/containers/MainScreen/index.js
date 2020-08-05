import React, { useState, useEffect } from 'react';
import { CTX } from 'store';
import { Plus } from 'react-feather';
import APIService from 'services/backstrap/apiService';
import Header from 'components/Header/Header';
import Toast from 'components/Toast/Toast';
import CardProperty from 'components/CardProperty'
import Button from 'components/Button/Button';
import TitleBar from 'components/TitleBar/TitleBar';
import BookingTable from 'components/BookingTable/BookingTable';

const MainScreen = (props) => {

    document.title = `Trekker Dashboard`;

    /////////////////////
    ////Default Stuff///
    ///////////////////
    const [appState, dispatch] = React.useContext(CTX);
    const token = appState.bs_user.cgo_api_key;
    const [msg, setMsg] = useState({active: false, type: null, data: null})
    const [state, setState] = useState({
      activeTab: 'bookings',
    })
    useEffect( () =>  { dispatch({type: 'UPDATE_ACTIVE_STEP', payload: 'dashboard'}) }, [appState.activeStep] )
    /////////////////////
    ////Listings Tab///
    ///////////////////
    const [properties, setProperties] = useState([])


    useEffect( () => {
      APIService.getProperties(token)
      .then((res) => {
        //console.log(res)
        setProperties(res)
      })
      .catch(err => {
        //console.log(err)
        setMsg({active: true, type: 'danger', data: 'Error Loading Properties'})
        dispatch({type: 'LOADING_DISABLED'})   
      })
    }, [])

    /////////////////////
    ////Bookings Tab///
    ///////////////////
    const pageLimit = 4;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookings, setBookings] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const toggleModal = (data, title, view) =>   {
      console.log(data)
      
      APIService.getListing(token, data.property_id)
      .then(res => {
        let tmp = data
        console.log(res, 'listing info')
        tmp.listing = res
        return tmp
      })
      .then(arr => {
        dispatch({type: 'TOGGLE_SIDEMODAL', payload: { 
          open: !appState.sideModalOpen.open,
          data: arr,
          title: title || '',
          view: view || 'default'
          }
        });
      })
      .catch(err => console.log(err, 'error getting listing'))

    }

    const modifyArr = (arr) => {
      let tmp = []
      arr.forEach(e => {
        let obj = e
        APIService.getListing(token, e.property_id).then(res => obj.name = res.name).catch(err => console.log(err))
        tmp.push(obj)
      });
      return tmp
    }
    useEffect( () => {
      APIService.getLessorLeases(token)
      .then(res => setBookings(modifyArr(res)))
      .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      console.log(bookings.slice(offset, offset + pageLimit), 'setCurrentData')
      setCurrentData(bookings.slice(offset, offset + pageLimit));
    }, [offset, bookings]);






    return (
      <>
      <Header props={props} />
      <TitleBar
        title={'Dashboard'}
        buttonPrimary={
          <Button 
            variant="outline-light" 
            label="Add Listing" 
            block={false} 
            icon={<Plus/>} 
            className="ml-3" 
            onClick={() => props.history.push('/listing/create')}
          />
        }
      />
      <div className="container">
        <div className="col-sm-12 mt-5">

        <ul className="nav nav-pills tab-nav">
          <li className="nav-item">
            <button 
              onClick={()=>setState( prevState => { return { ...prevState, activeTab: 'bookings'}})}
              className={`nav-link btn btn-block ${state.activeTab === 'bookings' && 'active'}`}>Bookings</button>
          </li>
          <li className="nav-item">
            <button 
              onClick={()=>setState( prevState => { return { ...prevState, activeTab: 'listings'}})}
              className={`nav-link btn btn-block ${state.activeTab === 'listings' && 'active'}`}>Listings</button>
          </li>
          <li className="nav-item">
            <button 
              onClick={()=>setState( prevState => { return { ...prevState, activeTab: 'earnings'}})}
              className={`nav-link btn btn-block ${state.activeTab === 'earnings' && 'active'}`}>Earnings</button>
          </li>
        </ul>

        { state.activeTab === 'listings' &&
          <>
          <h4 className="mt-5">Your Listings</h4>
          <div className="row mt-5">
          {
            properties.length > 0 ?
            properties.map( (e,i) =>  {

              return (
              <div className="col-sm-6 col-md-4 mb-5" key={i}>
                <CardProperty
                  name={e.name}
                  description={e.description}
                  img={e.img ? e.img : null}
                  photos={e.photos}
                  editLink={() => props.history.push(`/listing/edit/${e.id}`)}
                  onClick={() => props.history.push(`/property/${e.id}`)}
                />
              </div>

              )
            })
            :
            <p>You have no active listings. <button className="btn btn-link">Add a listing</button></p>
          }
          </div>
          </>
        }

        { state.activeTab === 'bookings' &&
        <>
          <h4 className="mt-5">Booking Requests</h4>
          <div className="booking-table-wrap mt-5">
            <BookingTable 
              data={bookings}
              currentData={currentData}
              pageLimit={pageLimit}
              pageNeighbours={2}
              setOffset={setOffset}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              actionClick={toggleModal}
            />
          </div>
        </>
        }

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

export default MainScreen;