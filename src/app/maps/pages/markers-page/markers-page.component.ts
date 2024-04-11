import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit, AfterViewChecked{

  ngAfterViewChecked(): void {
    this.saveToLocalStorage();
  }

  @ViewChild  ('map') divMap?: ElementRef

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public lngLat: LngLat = new LngLat(-74.09, 4.75)

  ngAfterViewInit(): void {

    if( !this.divMap) throw ' El elemento html no fue encontrado' ;

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 12

    });
    this.readFromLocalStorage();
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Aquí Esta el creador'
    // const marker = new Marker({
    //   //color: 'grey'
    //   element: markerHtml

    // })
    //   .setLngLat( this.lngLat )
    //   .addTo( this.map );

  }

  createMarker() {
    if ( !this.map ) return;
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color );

  }

  addMarker(lngLat: LngLat, color: string) {
    if( !this.map ) return;

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat( lngLat )
      .addTo (this.map );

    this.markers.push ({ color, marker, });
    this.saveToLocalStorage();

    marker.on('drageng', () => this.saveToLocalStorage() );
  }

  deleteMarker( index: number ){
    this.markers[index].marker.remove();
    this.markers.splice( index, 1);
  }

  flyTo(  marker: Marker ){

    this.map?.flyTo({
      zoom: 15,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map( ({color, marker})=>{
      return {
        color: color,
        lngLat: marker.getLngLat().toArray()
      }
    });
    //console.log(plainMarkers);
    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));

  }





  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); //! OJO ! A VECES NO ES DE ESE TIPO PlainMarker

    //console.log(plainMarkers);

    plainMarkers.forEach ( ({ color, lngLat}) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat);

      this.addMarker(coords, color)

    });



  }

}
