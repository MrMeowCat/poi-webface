export interface Coords {
  lat: number;
  lng: number;
}

class GeolocationService {

  public getGeolocation = (): Promise<Coords> => {
    return new Promise<Coords>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: Position) => {
          const coords: Coordinates = position.coords;
          resolve({
            lat: coords.latitude,
            lng: coords.longitude
          });
        }, (err: any) => {
          reject(err);
        });
      } else {
        reject('Geolocation is not allowed');
      }
    });
  }
}

export const geolocationService: GeolocationService = new GeolocationService();
