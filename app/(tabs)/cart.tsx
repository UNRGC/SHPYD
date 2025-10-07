import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, Modal} from 'react-native';
import {Image} from 'expo-image';
import {Colors} from "@/constants/theme";

const initialGames = [
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

export default function CartScreen() {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const [cartGames, setCartGames] = useState(initialGames);
    const [selectedGame, setSelectedGame] = useState<typeof initialGames[0] | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const removeFromCart = (id: number) => {
        setCartGames(cartGames.filter(game => game.id !== id));
    };

    const showDetails = (game: typeof initialGames[0]) => {
        setSelectedGame(game);
        setModalVisible(true);
    };

    const total = cartGames.reduce((sum, game) => sum + game.pricing, 0);

    return (
        <>
            <ScrollView style={{backgroundColor: colors.background}}>
                <View style={styles.container}>
                    <Text style={styles.title}>Carrito de compras</Text>
                    <View style={styles.counterContainer}>
                        <Text style={styles.counterText}>
                            Juegos: {cartGames.length}
                        </Text>
                        <Text style={styles.counterText}>
                            Total: ${total.toFixed(2)}
                        </Text>
                    </View>
                    {cartGames.length === 0 ? (
                        <Text style={styles.empty}>El carrito está vacío.</Text>
                    ) : (
                        cartGames.map(game => (
                            <View key={game.id} style={styles.gameCard}>
                                <Image style={styles.image} source={game.image} contentFit="cover"/>
                                <View style={{flex: 1}}>
                                    <Text style={styles.name}>{game.name}</Text>
                                    <Text style={styles.price}>${game.pricing.toFixed(2)}</Text>
                                    <View style={{flexDirection: 'row', gap: 8}}>
                                        <TouchableOpacity onPress={() => showDetails(game)} style={styles.detailsBtn}>
                                            <Text style={styles.detailsText}>Ver detalles</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => removeFromCart(game.id)}
                                                          style={styles.removeBtn}>
                                            <Text style={styles.removeText}>Eliminar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedGame && (
                            <>
                                <Image style={styles.modalImage} source={selectedGame.image} contentFit="cover"/>
                                <Text style={styles.modalName}>{selectedGame.name}</Text>
                                <Text style={styles.modalPlatform}>Tipo de entrega: Código canjeable</Text>
                                <Text style={styles.modalPlatform}>Plataforma de canje: Steam</Text>
                                <Text style={styles.modalPrice}>${selectedGame.pricing.toFixed(2)}</Text>
                                <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.closeText}>Cerrar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        minHeight: 600,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24,
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    counterText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    empty: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 48,
    },
    gameCard: {
        flexDirection: 'row',
        backgroundColor: '#341281',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
        gap: 16,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    price: {
        color: '#00ff0d',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detailsBtn: {
        backgroundColor: '#1f0a4d',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginRight: 8,
    },
    detailsText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    removeBtn: {
        backgroundColor: '#1f0a4d',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    removeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#1f0a4d',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        width: 300,
    },
    modalImage: {
        width: 128,
        height: 198,
        borderRadius: 8,
        marginBottom: 16,
    },
    modalName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    modalPlatform: {
        color: '#ccc',
        fontSize: 15,
        marginBottom: 8,
    },
    modalPrice: {
        color: '#00ff0d',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 16,
    },
    closeBtn: {
        backgroundColor: '#ff0033',
        paddingVertical: 6,
        paddingHorizontal: 24,
        borderRadius: 6,
    },
    closeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
