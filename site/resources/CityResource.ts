import { RemoteResource, RemoteResourceProps } from "../ComponentLinks";

export interface City {
    id: string,
    name: string,
    latitude: string;
    longitude: string;
    population: string,
    region: string
};

let props: RemoteResourceProps = {
    url: "http://localhost:3000/cities"
};

export class CityResource extends RemoteResource <City, String> {
    public constructor(){
        super(props);
    }
}

export default new CityResource();