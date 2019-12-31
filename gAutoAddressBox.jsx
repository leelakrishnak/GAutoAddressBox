import React, { Component } from 'react';
import { Input, Button } from 'antd';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';
import { location } from 'react-icons-kit/icomoon';
import './gAutoAddressBox.less';

class GAutoAddressBox extends Component {
  handleSelect = selected => {
    let city = selected.split(',').reverse();
    if (city.length > 1) {
      city = `${city[2]},${city[1]}`;
    }
    geocodeByAddress(selected)
      .then(res => {
        return getLatLng(res[0]);
      })
      .then(({ lat, lng }) => {
        this.props.onAddressSelected({
          address: selected,
          city: city,
          geoPoint: {
            __type: 'GeoPoint',
            latitude: lat,
            longitude: lng
          }
        });
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  mouseEnter = () => {
    this.props.onMouseEnter && this.props.onMouseEnter();
  };
  mouseLeave = () => {
    this.props.onMouseLeave && this.props.onMouseLeave();
  };

  render() {
    const address = this.props.address || '';
    const { placeholder } = this.props;

    const searchOptions = {
      componentRestrictions: { country: ['IN'] }
      // types: ["address"]
    };

    return (
      <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <PlacesAutocomplete
          onChange={this.props.onChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 1}
          searchOptions={searchOptions}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => {
            return (
              <div className='google__search-bar-container'>
                <div className='google__search-input-container'>
                  <Input
                    {...getInputProps({
                      placeholder: placeholder || 'Search address...'
                    })}
                    autoComplete='new-password'
                    prefix={<Icon icon={location} />}
                  />
                  {address.length > 0 && (
                    <Button
                      style={{ height: 40 }}
                      className='google__clear-button'
                      shape='circle'
                      onClick={this.props.onClearAddress}
                      icon='close-circle-o'
                    />
                  )}
                </div>
                {loading && <div>Loading...</div>}
                {suggestions.length > 0 && (
                  <div className='google__autocomplete-container'>
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'google__suggestion-item--active'
                        : 'google__suggestion-item';
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className
                          })}
                        >
                          <span>
                            <Icon icon={location} />
                            {suggestion.description}
                          </span>
                        </div>
                      );
                    })}
                    <div className='google__dropdown-footer'>
                      <div>
                        <img
                          alt='google logo'
                          src={'powered_by_google_on_white.png'}
                          className='google__dropdown-footer-image'
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
      </div>
    );
  }
}
GAutoAddressBox.propTypes = {
  onAddressSelected: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  onClearAddress: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};
export default GAutoAddressBox;
