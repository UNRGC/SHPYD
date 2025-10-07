import {Tabs} from 'expo-router';
import React from 'react';

import {HapticTab} from '@/components/haptic-tab';
import {Colors} from '@/constants/theme';
import {useColorScheme} from '@/hooks/use-color-scheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: Colors[colorScheme ?? 'light'].backgroundVariant,
                    borderTopColor: Colors[colorScheme ?? 'light'].backgroundVariant
                },
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <FontAwesome name="home" size={24} color={color}/>,
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Carrito',
                    tabBarIcon: ({color}) => <FontAwesome name="shopping-cart" size={24} color={color}/>,
                }}
            />
        </Tabs>
    );
}
