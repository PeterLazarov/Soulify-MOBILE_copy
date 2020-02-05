import React from 'react';
import { View } from 'react-native';
import routeProvider from './services/route-provider';
import timezoneProvider from './services/timezone-provider';
import push from './services/push';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialRoute: null,
      initialRouteParams: null
    };
  }

  async componentDidMount() {
    this.setState({
      initialRoute: await routeProvider.getRoot()
    });

    await timezoneProvider.setUserTimezone();
    push.configure({
      onMedicineReminder: therapyHistoryId => {
        this.setState({
          initialRoute: 'MedicineFeedback',
          initialRouteParams: {
            therapyHistoryId
          }
        });
      }
    });
  }

  render() {
    if (this.state.initialRoute) {
      const AppNavigator = routeProvider.getAppNavigator(this.state.initialRoute, this.state.initialRouteParams);
      return <AppNavigator />;
    } else {
      return <View />;
    }
  }
}