import { ThreeDots } from 'react-loader-spinner';

import React, { Component } from 'react';

export default class Loader extends Component {
  render() {
    return (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifySelf: 'center' }}
        wrapperClassName=""
        visible={true}
      />
    );
  }
}
