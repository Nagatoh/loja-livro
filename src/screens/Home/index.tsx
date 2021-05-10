import React, { ReactElement, useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import categories from '../../utils/subjects';
import api from '../../services/api';

import Shoes from '../../components/Book'
import PickerModal from '../../components/PickerModal';
import { BookDataProps, SubjectProps } from '../../types';

import { FlatList } from 'react-native-gesture-handler';
import LoadMoreButton from '../../components/LoadMoreButton';

const showAlert = () =>
    Alert.alert(
        "Alert Title",
        "My Alert Msg",
    );


const Home = (): ReactElement => {
    const [maxResults, setMaxResults] = useState(15);
    const [showPicker, setShowPicker] = useState<string>('');
    const [category, setCategory] = useState<SubjectProps>({ id: 20, title: 'Economy' });
    const [booksData, setBooksData] = useState<BookDataProps[]>([]);

    const navigation = useNavigation()

    const handleGetBooks = async (searchTerm: string, maxResults = 15) => {
        console.log('handleGetBooks-entrou', searchTerm)
        const { data } = await api.get(`${searchTerm}&maxResults=${maxResults}`);
        const books = data.items;

        const filteredBooks = books.filter(
            (book: BookDataProps) => book.volumeInfo.imageLinks,
        );

        setBooksData(filteredBooks);
    };

    useEffect(() => {
        if (category.title != "") {
            console.log('category', category.title, maxResults);
            handleGetBooks(category.title, maxResults);
        }
        console.log('books', booksData);
        setShowPicker('')
    }, [category, maxResults]);


    //loading da pagina
    const handleLoadMore = () => {
        setMaxResults(prevState => prevState + 5);
    };

    const renderLoadMoreButton = () => {
        if (maxResults >= 40) {
            return <></>;
        }
        return <LoadMoreButton onPress={handleLoadMore} />;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/biblioteca.jpg')}
                    style={styles.image}
                />

                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={() => setShowPicker('Categorias')}>
                        <Text style={styles.text}>Selecionar Categoria</Text>
                    </TouchableOpacity>
                    {/* <Text style={[styles.text, { color: '#CECECF' }]}>•</Text>
                    <Text style={[styles.text, { color: '#CECECF' }]}>Masculino</Text> */}
                    <PickerModal
                        visible={Boolean(showPicker)}
                        title={showPicker}
                        items={showPicker ? categories : []}
                        onClose={() => { setShowPicker('') }}
                        onSelect={(value) => { setCategory(value) }}
                        value={showPicker ? category : undefined}
                    />

                    <TouchableOpacity style={{ position: 'absolute', right: 0, alignSelf: 'center' }}>
                        <MaterialIcons
                            name="filter-list"
                            size={24}
                            color="#000"
                        >
                        </MaterialIcons>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.scroll}>
                <Text style={styles.text}>Livros</Text>

                <FlatList
                    data={booksData}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    contentContainerStyle={{ alignItems: 'center' }}
                    renderItem={({ item }) => (
                        <Shoes
                            img={item.volumeInfo.imageLinks.thumbnail}
                            bookId={item.id}
                            pages={item.volumeInfo.pageCount}
                        >
                            {item.volumeInfo.title}
                        </Shoes>
                    )}
                    ListFooterComponent={renderLoadMoreButton}
                />


            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF'
    },
    header: {
        height:'50%',
        width:'100%',
        paddingTop:'0%',
        marginTop:'0%'
        
    },
    image: {
        flex:2,
        width: '100%',
        height: '60%',
    },
    scroll: {
        flex: 4,
        paddingTop:'-60%'
    },
    textContainer: {
        flexDirection: 'row',
        marginVertical: '15%',
        marginHorizontal: '15%',
    },
    text: {
        fontFamily: 'Anton_400Regular',
        fontSize: 26,
        marginHorizontal: '1%'
    }

})


export default Home;