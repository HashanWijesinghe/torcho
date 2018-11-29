import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native';
import Torch from 'react-native-torch';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      number: 0
    }
  }

  setNumber = () => {
    this.setState({
      number: this.state.number < 3 ? this.state.number + 1 : 1
    })
  };

  onOff = async () => {
    this.inte = setInterval(this.setNumber, 1000);
    this.setState({
      isOn: true
    })
    if (Platform.OS === 'ios') {
      Torch.switchState(this.state.isOn)
    } else {
      const cameraAllowed = await Torch.requestCameraPermission(
        'Camera Permissions',
        'We require camera permissions to use the torch'
      );
      if (cameraAllowed) {
        try {
          Torch.switchState(this.state.isOn)
        } catch (error) {
          ToastAndroid.show('We seems to an issue accessing your torch', ToastAndroid.SHORT)
        }
      }
    }
  }

  off = () => {
    clearInterval(this.inte)
    this.setState({
      isOn: false,
      number: 0
    });
    Torch.switchState(false);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#2c3e50'} />
        <View style={styles.mainContent}>
          <View style={{
            height: 185,
            width: 185,
            borderRadius: 90,
            backgroundColor: this.state.number === 3 ? 'rgba(39, 174, 96,0.1)' : '#2c3e50',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <View style={{
              height: 165,
              width: 165,
              borderRadius: 80,
              backgroundColor: this.state.number === 2 ? 'rgba(39, 174, 96,0.4)' : '#2c3e50',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{
                height: 145,
                width: 145,
                borderRadius: 75,
                backgroundColor: this.state.number === 1 ? 'rgba(39, 174, 96,0.6)' : '#2c3e50',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <View style={{
                  height: 125,
                  width: 125,
                  borderRadius: 60,
                  backgroundColor: '#2c3e50',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <TouchableOpacity style={styles.button} onPress={this.state.isOn ? this.off : this.onOff}>
                    <Text style={styles.btnText}>{this.state.isOn ? 'Off' : 'On'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>torcho</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerText: {
    color: '#7f8c8d',
    fontWeight: '600',
    fontSize: 20
  },
  mainContent: {
    flex: 10,
    justifyContent: 'center'
  },
  footer: {
    flex: 1
  },
  btnText: {
    color: '#000',
    fontSize: 30,
    fontWeight: '600'
  },
  button: {
    height: 110,
    width: 110,
    borderRadius: 60,
    backgroundColor: 'rgba(39, 174, 96,1.0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});
// backgroundColor: '#27ae60',
