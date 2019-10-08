import React, { Component } from "react";
import { Button } from "antd";

import { withProvider, withConsumer } from "./ProviderContext";

class OneLayerCom extends Component {
  render() {
    return (
      <div>
        <h1>OneLayerCom</h1>
        <TwoLayerCom />
      </div>
    );
  }
}

class TwoLayerCom extends Component {
  render() {
    return (
      <div>
        <h1>TwoLayerCom</h1>
        <ThreeLayerCom />
      </div>
    );
  }
}

@withConsumer
class ThreeLayerCom extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>ThreeLayerCom</h1>
        <Button onClick={() => this.props.store.logName()}>
          {this.props.store.name}
        </Button>
      </div>
    );
  }
}

@withProvider
// CrossLayProvider
class CrossLayProvider extends Component {
  render() {
    return (
      <div>
        <h1>CrossLayProvider</h1>
        <OneLayerCom />
      </div>
    );
  }
}

export default CrossLayProvider;
