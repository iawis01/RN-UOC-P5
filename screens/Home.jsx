import {
	View,
	Text,
	Button,
	ScrollView,
	ActivityIndicator,
	Pressable,
	TouchableOpacity,
	Platform,
	Alert,
} from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect } from 'react';
import { Image } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

const buttonStyle = {
	color: 'white',
	fontSize: 42,
	lineHeight: 84,
	margin: 5,
	fontWeight: 'bold',
	textAlign: 'center',
	backgroundColor: '#000000c0',
};

const Home = () => {
	const tw = useTailwind();
	const navigation = useNavigation();

	// Pedir permisos para las push notifications
	useEffect(() => {
		async function configurePushNotifications() {
			const { status } = await Notifications.getPermissionsAsync();
			let finalStatus = status;

			if (finalStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				Alert.alert('Permission required', 'You must otorgate permissions');
				return;
			}
			const pushTokenData = await Notifications.getExpoPushTokenAsync();
			console.log(pushTokenData);

			if (Platform.OS === 'android') {
				Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.DEFAULT,
				});
			}
		}
		configurePushNotifications();
	}, []);

	// Estilo del Header
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginLeft: 12 }}
					onPress={() => navigation.navigate('Perfil')}
				>
					<AntDesign name='user' size={24} color='white' />
				</TouchableOpacity>
			),
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 12 }}
					onPress={() => navigation.navigate('Contactar')}
				>
					<AntDesign name='mail' size={24} color='white' />
				</TouchableOpacity>
			),
			title: 'Mis Retos',
			headerTitleAlign: 'center',
			headerStyle: {
				backgroundColor: '#006ad8',
			},
			headerTitleStyle: {
				color: navigation.isFocused ? '#fff' : 'gray',
				fontWeight: 'bold',
			},
		});
	}, [navigation]);

	return (
		<ScrollView style={{ backgroundColor: '#006ad8' }}>
			<Image
				style={{
					position: 'absolute',
					left: 0,
					bottom: 0,
					w: 'full',
					h: '300px',
					resizeMode: 'cover',
				}}
				source={require('../assets/masthead.png')}
				containerStyle={{ width: '100%', aspectRatio: 3 / 2 }}
				PlaceholderContent={<ActivityIndicator />}
			/>

			<TouchableOpacity style={buttonStyle}>
				<Button
					title='Evolucion'
					onPress={() => navigation.navigate('Evolucion')}
				/>
			</TouchableOpacity>

			<TouchableOpacity style={buttonStyle}>
				<Button
					title='Nuevo Reto'
					onPress={() => navigation.navigate('NuevoReto')}
				/>
			</TouchableOpacity>

			<TouchableOpacity style={buttonStyle}>
				<Button
					title='Retos Completados'
					onPress={() => navigation.navigate('Completados')}
				/>
			</TouchableOpacity>

			<TouchableOpacity style={buttonStyle}>
				<Button
					title='Retos Activos'
					onPress={() => navigation.navigate('Activos')}
				/>
			</TouchableOpacity>
		</ScrollView>
	);
};
export default Home;
