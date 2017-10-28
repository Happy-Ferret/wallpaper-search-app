import React from 'react';
import {
    StackNavigator,
} from 'react-navigation';

import HomeModule from './modules/home.js'
import SidebarMenuModule from './modules/sidebar-menu.js'

export default App = StackNavigator({
    Main: {screen: HomeModule},
    Menu: {screen: SidebarMenuModule},
});
