import React, { useState, useRef, useCallback, useEffect } from 'react';
import { LoadScript, GoogleMap, Polygon } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from 'config'
import Button from 'components/Button/Button';
import './EditListingMap.scss'
import { CTX } from 'store';

const EditListingMap = (props) => {
  const [appState, dispatch] = React.useContext(CTX);
  // Store Polygon path in state
  const [path, setPath] = useState(props.path);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
      dispatch({type: 'EDIT_MAP_COORDINATES', payload: nextPath})
    }

  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const p = polygon.getPath();
      listenersRef.current.push(
        p.addListener("set_at", onEdit),
        p.addListener("insert_at", onEdit),
        p.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  useEffect( () => {

  }, [onEdit] )

  //console.log("The path state is", path);
  
    return (
        <form onSubmit={props.onSubmit}>
        <h4 className="mb-3">Map View</h4>
        <p className="mb-5">Specify your property by dragging the corners of the polygon on the map.</p>
        {props.path.length > 0 ?
        <LoadScript
        id="script-loader"
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="listing-map-wrap"
          center={props.location}
          zoom={15}
          version="weekly"
          on
        >
          <Polygon
            // Make the Polygon editable / draggable
            editable
            draggable
            path={path}
            // Event used when manipulating and adding points
            onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            onDragEnd={onEdit}
            onLoad={onLoad}
            onUnmount={onUnmount}
          />
        </GoogleMap>
      </LoadScript>
      : <p>Loading</p>}
        <Button
          className="my-5"
          type="submit"
          variant="primary"
          block={true}
          label="Save Map Changes" 
          size="lg"
        />

        </form>
    )
}

export default EditListingMap