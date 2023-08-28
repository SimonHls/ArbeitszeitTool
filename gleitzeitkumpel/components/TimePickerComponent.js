import React, { useState } from 'react';
import { View, Platform, Button, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePickerComponent = ({ value, onChange}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const customOnChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      onChange(event, selectedDate);  // Verwende übergebene onChange Funktion
    }
  };

  const openPicker = () => setShow(true);

  return (
    <View>
      {Platform.OS === 'ios' ? (
        <DateTimePicker
          value={value}  // Verwende übergebenen value
          mode="time"
          is24Hour={true}
          display="default"
          onChange={customOnChange}  // Verwende customOnChange
        />
      ) : (
        <TouchableOpacity onPress={openPicker} style={{ backgroundColor: '#404040', padding: 10, borderRadius:10}}>
          <Text style={{ fontWeight: '500', fontSize: 16, color: 'white'}}>
            {value.toLocaleString('de-DE', {hour: '2-digit', minute:'2-digit', hourCycle: 'h23'})}
          </Text>
        </TouchableOpacity>
      )}

      {show && Platform.OS === 'android' && (
        <DateTimePicker
          value={value}  // Verwende übergebenen value
          mode="time"
          is24Hour={true}
          display="default"
          onChange={customOnChange}  // Verwende customOnChange
        />
      )}
    </View>
  );
};

export default TimePickerComponent;
