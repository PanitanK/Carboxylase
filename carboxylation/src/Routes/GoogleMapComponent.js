import React from "react";
import { GoogleMap, Marker, Polygon, withScriptjs, withGoogleMap, TrafficLayer } from "@react-google-maps/api";
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import compose from "recompose/compose";
import withProps from "recompose/withProps";




<GoogleMapComponent
    isMarkerShown={true}
    isPostcodeHighlighted={true}
    isSuburbHighlighted={true}
    showTrafficLayer={false}
    defaultZoom={11}
    loadingElement={<div style={{ height: "600px" }} />}
    containerElement={<div style={{ height: "600px", width: "100%" }} />}
    mapElement={<div style={{ height: "600px", width: "100%" }} />}
    mapType={"hybrid"}
    tilt={45}
    defaultCentre={
        this.props.suburb.centre}
    polygons={
        this.props.suburbList.map((p, i) => {
            return ({
                boundaries: p.suburbGeoBoundaries,
                suburbCentre: p.suburbCentre,
                metaData: {
                    name: `${p.suburbName}`,
                    suburbId: `${p.suburbId}`
                }
            })
        })
    }
    selectedMarker={this.state.selectedMarker}
    onClick={this.handleClick}
    googleMapURL={config.googleMapURL}
></GoogleMapComponent>

export default GoogleMapComponent;