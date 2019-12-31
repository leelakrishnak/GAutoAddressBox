# What is this

This is a react Google auto address completion componet based on react-places-autocomplete (<https://www.npmjs.com/package/react-places-autocomplete).>

## How to use this

1.

```bash
$yarn add react-places-autocomplete
$yarn add react-icons-kit antd // Optional, these  UI libraries used for icons and style, these can be changed.
```

2.

Add this below script tag in your public/index.html page in react project, replace YOUR_API_KEY with Google maps developer API key.
(How to get it? <https://developers.google.com/maps/documentation/javascript/get-api-key)>

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
```

3.

```js
import GAutoAddressBox from "gAutoAddressBox";

state => {
    location: {};
}

<GAutoAddressBox
    address={location.address} // this location is data.address from below onAddressSelected.
    onAddressSelected={data => {
        console.log("address selected");
        console.log(data.address, data.geoPoint);
        this.setState({location: data});
    }}
    onChange={address => {
    console.log("Input changed");
    this.setState({location.address : address});
    }}
    onClearAddress={() => {
        console.log("address is cleared");
        this.setState({location: {}})
    }}
/>
```
