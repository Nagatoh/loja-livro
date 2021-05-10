import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, Picker, TouchableWithoutFeedbackBase } from 'react-native';
import { SubjectProps } from '../../types';
// import { Container } from './styles';

interface AppProps {
    visible: boolean;
    items: Array<SubjectProps>;
    title: string;
    onClose: Dispatch<SetStateAction<string>>;
    onSelect: (value: any) => void;
    value?: SubjectProps;
}
const PickerModal = ({
    visible,
    items,
    title,
    onClose,
    onSelect,
    value,

}: AppProps) => {

    const [pickerValue, setPickerValue] = useState<SubjectProps>()
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (pickerValue) {
            onSelect(pickerValue)
        }
        if(value){
            visible = false
        }

    }, [value, pickerValue])

    return (
        <Modal
            animated
            transparent
            visible={visible}
            animationType="fade"
        >
            <View style={styles.container}>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={pickerValue} onValueChange={(value) => setPickerValue(value)}>
                        {items.map(item => (
                            <Picker.Item value={item} key={item.id} label={item.title} />
                        ))}
                    </Picker>

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    pickerContainer: {
        height: 200,
        width: '100%',
        backgroundColor: 'white',
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee'
    }
})

export default PickerModal;