import { RouteProp, useRoute } from '@react-navigation/core';
import AppLoading from 'expo-app-loading';
import React, { ReactElement, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Dot from '../../components/Dot';
import api from '../../services/api';
import { BookDataProps, IParams } from '../../types';

// import { Container } from './styles';

interface DetailProps {
    navigation: number
    item: any
}

const Detail = ({ navigation }: { navigation: any }) => {
    const [bookData, setBookData] = useState<BookDataProps>();
    let url = 'http://books.google.com/books/publisher/content?id=ZNGNCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71YK4guFEqCuuIFrJCMwhhs9oysmsjEiaVJhVHoJ-yLhNM8S9VkeJ0DBO9FHI8MS_XUsNt-Hz4ce9pTBm3Nu8soMQB3BD0U16mPp0voOh5ujT-61tgdOyB6C9BQkKCj0OSLLL-2&source=gbs_api';
    const { params } = useRoute<RouteProp<IParams, 'Details'>>();


    const handleBookData = async () => {
        const { data } = await api.get(
            `https://www.googleapis.com/books/v1/volumes/${params.bookId}`,
        );
        setBookData(data);
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: params.children
        })
        handleBookData();
    }, []);

    if (!bookData) {
        return <AppLoading />;
    }

    const {
        saleInfo: { listPrice },
        volumeInfo: {
            title,
            description,
            pageCount,
            authors,
            imageLinks: { thumbnail },
        },
    } = bookData;

    return (
            <View>
                <View>
                    <Text style={[styles.title, { fontSize: 30, color: '#555557' }]}>{title}</Text>
                </View>
                <View>
                    <Text style={[styles.title, { fontSize: 24, color: '#555557' }]}>by {authors ? authors.toString() : 'Desconhecido'}</Text>
                </View>
                <Image
                    source={{
                        uri: thumbnail,
                    }}
                    style={styles.image} />

                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <ScrollView>

                    </ScrollView>
                </View>
            </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },

    image: {
        width: '60%',
        height: '60%',
        alignItems: 'center',
        marginTop: '5%',
        marginLeft: '20%',
    },

    title: {
        fontFamily: 'Anton_400Regular',
        paddingHorizontal: '2%'
    },

    dotContainer: {
        flexDirection: 'row',
        marginVertical: '7%'
    }

})

export default Detail;
