import React, { InputHTMLAttributes } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, TextInputProps, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';
interface AppProps extends InputHTMLAttributes<HTMLInputElement> {
    img: string;
    bookId: string;
    pages: string;
    children: string;
}

const Book = ({ img, bookId, pages, children }: AppProps) => {
    const { navigate } = useNavigation();

    function filterDesc(desc: string) {
        if (desc.length < 23) {
            return desc;
        }
        return `${desc.substring(0, 23)}...`
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigate('Detail', { bookId,children })}>
            <Image
                source={{
                    uri: img,
                }}
                style={styles.shoesImg} />

            <Text style={styles.shoesText}>
                {filterDesc(children)}
            </Text>
            <View needsOffscreenAlphaCompositing={true}>
                <Text style={styles.shoesPriceText}>{pages ? pages + ' Páginas' : 'Não Encontrado'}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    shoesImg: {
        width: 175,
        height: 175,
    },
    shoesText: {
        fontSize: 16
    },
    shoesPriceText: {
        color: '#000',
        opacity: .54
    }
});

export default Book;