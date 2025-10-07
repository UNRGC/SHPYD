import {Dimensions, ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from "@/constants/theme";
import {Image} from "expo-image";

export default function HomeScreen() {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const screenHeight = Dimensions.get('window').height;
    const navBarHeight = 56;

    const games = [
        {
            id: 1,
            name: "Marvel's Spider-Man 2 (PC)",
            pricing: 1199.99,
            image: require("@/assets/images/1.jpg")
        },
        {
            id: 2,
            name: "Injustice: Gods Among Us (PC)",
            pricing: 249.50,
            image: require("@/assets/images/2.jpg")
        },
        {
            id: 3,
            name: "The Suicide Squad: Kill The JL (PC)",
            pricing: 899.75,
            image: require("@/assets/images/3.jpg")
        },
        {
            id: 4,
            name: "Batman Arkham Collection (PC)",
            pricing: 499.90,
            image: require("@/assets/images/4.jpg")
        },
        {
            id: 5,
            name: "Helldivers 2 (PC)",
            pricing: 799.20,
            image: require("@/assets/images/5.jpg")
        },
        {
            id: 6,
            name: "Injustice 2 (PC)",
            pricing: 349.99,
            image: require("@/assets/images/6.jpg")
        }
    ];

    return (
        <ScrollView style={{backgroundColor: colors.background}}>
            <View style={[styles.container, {minHeight: screenHeight - navBarHeight}]}>
                <View style={styles.header}>
                    <Image style={{width: 32, height: 32}} source={require('@/assets/images/logo.jpg')}></Image>
                    <Text style={{color: colors.text, fontSize: 24, fontWeight: 'bold'}}>SHPYD</Text>
                </View>
                <Image style={styles.banner} source={require('@/assets/images/banner.jpg')}></Image>
                <View style={styles.home}>
                    <Text style={{color: colors.text, fontSize: 24, fontWeight: 'bold'}}>Juegos en promoción | Claves de
                        Steam</Text>
                    <View style={styles.games}>
                        {games.map((game) => (
                            <View key={game.id} style={{
                                backgroundColor: '#1f0a4d',
                                borderRadius: 4,
                                padding: 8,
                                width: 256
                            }}>
                                <Image
                                    style={{width: '100%', height: 360, borderRadius: 8}}
                                    source={game.image}
                                    contentFit="cover"
                                />
                                <Text style={{color: colors.text, fontWeight: 'bold', marginTop: 8}}
                                      numberOfLines={2}>{game.name}</Text>
                                <Text style={{color: '#00ff0d', marginTop: 4}}>Clave de Steam</Text>
                                <Text style={{
                                    color: colors.text,
                                    fontWeight: 'bold',
                                    marginTop: 8
                                }}>${game.pricing.toFixed(2)}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        padding: 16,
    },
    banner: {
        width: '100%',
        height: 256,
        resizeMode: 'cover',
    },
    home: {
        flex: 1,
        flexDirection: "column",
        gap: 32,
        padding: 24
    },
    games: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 16,
        justifyContent: 'center'
    }
});
