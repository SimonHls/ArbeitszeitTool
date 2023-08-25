import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './AppStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Slider from '@react-native-community/slider';

export default function App() {

  const [configCollapsed, setConfigCollapsed] = useState(true);
  const [solarHours, setSolarHours] = useState(8);
  const [breakfastPause, setBreakfastPause] = useState(15);
  const [lunchPause, setLunchPause] = useState(30);
  const [lunchPauseAfter, setLunchPauseAfter] = useState(6.25);
  const [overtime, setOvertime] = useState(0);
  const [arrivalTime, setArrivalTime] = useState(new Date(1970, 0, 1, 7, 30));
  const [departureTime, setDepartureTime] = useState(new Date(arrivalTime.getTime() + solarHours * 60 * 60 * 1000 + breakfastPause * 60 * 1000 + lunchPause * 60 * 1000));

  // Zustandsvariablen für Fehlermeldungen
  const [solarHoursText, setSolarHoursText] = useState('');
  const [solarHoursError, setSolarHoursError] = useState(false);
  const [breakfastPauseText, setBreakfastPauseText] = useState('');
  const [breakfastPauseError, setBreakfastPauseError] = useState(false);
  const [lunchPauseText, setLunchPauseText] = useState('');
  const [lunchPauseError, setLunchPauseError] = useState(false);
  const [lunchPauseAfterText, setLunchPauseAfterText] = useState('');
  const [lunchPauseAfterError, setLunchPauseAfterError] = useState(false);

  const onChangeArrivalTime = (event, selectedDate) => {
    if (selectedDate) {
      setArrivalTime(selectedDate);
    }
  };

  const onChangeDepartureTime = (event, selectedDate) => {
    if (selectedDate) {
      setDepartureTime(selectedDate);
    }
  }

  // Validierungsfunktionen
  const validateNumericInput = (text, setValue, setError) => {
    text = text.replace(',', '.');
    if (text.trim() === '') {
      setError(false);
      return; // Wenn die Eingabe leer ist, wird nichts weiter gemacht
    }

    const value = parseFloat(text);
    if (isNaN(value) || value < 0) {
      setError(true);
      return;
    }
    setValue(value);
    setError(false);
  };


  const calculateResults = () => {
    // Convert solarHours, breakfastPause, and lunchPause to minutes
    let requiredTime = arrivalTime.getHours() * 60 + arrivalTime.getMinutes() + solarHours * 60 + breakfastPause + lunchPause;
    let lunchThreshold = arrivalTime.getHours() * 60 + arrivalTime.getMinutes() + lunchPauseAfter * 60;
    let overtimeThreshold = requiredTime + overtime * 60; // Convert overtime to minutes
    let currentOvertimeMinutes = departureTime.getHours() * 60 + departureTime.getMinutes() - requiredTime;
    return {
      requiredTime,
      lunchThreshold,
      overtimeThreshold,
      currentOvertimeMinutes
    };
  };

  const results = calculateResults();

  const saveConfig = async () => {
    try {
      await AsyncStorage.setItem('config', JSON.stringify({
        solarHours,
        breakfastPause,
        lunchPause,
        lunchPauseAfter
      }));
    } catch (error) {
      // Fehler beim Speichern der Daten
    }
  };

  useEffect(() => {
    saveConfig();
  }, [solarHours, breakfastPause, lunchPause, lunchPauseAfter]);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const value = await AsyncStorage.getItem('config');
        if(value !== null) {
          const config = JSON.parse(value);
          setSolarHours(config.solarHours);
          setBreakfastPause(config.breakfastPause);
          setLunchPause(config.lunchPause);
          setLunchPauseAfter(config.lunchPauseAfter);
        }
      } catch (error) {
        // Fehler beim Laden der Daten
      }
    };

    loadConfig();
  }, []);


  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: '#ebebeb' }}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Arbeitszeit Helper</Text>
      </View>

      <View style={styles.contentWrapper}>
        <TouchableOpacity onPress={() => setConfigCollapsed(!configCollapsed)}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center', }}>
            { configCollapsed ? (
              <>
                <Text style={styles.miniHeader}>Konfiguration  ausklappen</Text>
                <Icon
                  name={configCollapsed ? 'chevron-down' : 'chevron-up'}
                  size={15}
                />
              </>
            ) : (
              <>
                <Text style={styles.miniHeader}>Konfiguration  einklappen</Text>
                <Icon
                  name={configCollapsed ? 'chevron-down' : 'chevron-up'}
                  size={15}
                />
              </>
            )}
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={configCollapsed}>
          <Text style={styles.textInputExplainerText}>Die Sollarbeitszeit pro Tag in Stunden</Text>
          <TextInput
            placeholder={"Sollarbeitszeit in Stunden"}
            value={solarHoursText}
            onChangeText={text => {
              setSolarHoursText(text);
              validateNumericInput(text, setSolarHours, setSolarHoursError);
            }}
            onBlur={() => {
              if (solarHoursText.trim() === '') {
                setSolarHours('');
              }
            }}
            keyboardType="numeric"
            style={styles.TextInput}
          />
          {solarHoursError && <Text style={{color: 'red'}}>Ungültige Eingabe</Text>}


          <Text style={styles.textInputExplainerText}>Die Zeit, die für die Frühstückspause abgezogen wird [min.]</Text>
          <TextInput
            placeholder="Zeit Frühstückspause in Minuten" 
            value={breakfastPause}
            onChangeText={text => {
              setBreakfastPauseText(text);
              validateNumericInput(text, setBreakfastPause, setBreakfastPauseError);
            }}
            keyboardType="numeric"
            style={styles.TextInput}
          />
          {breakfastPauseError && <Text style={{color: 'red'}}>Ungültige Eingabe für Frühstückspause</Text>}

          <Text style={styles.textInputExplainerText}>Die Zeit, die für die Mittagspause abgezogen wird [min.]</Text>
          <TextInput 
            placeholder="Zeit Mittagspause in Minuten" 
            value={lunchPause}
            onChangeText={text => {
              setLunchPauseText(text);
              validateNumericInput(text, setLunchPause, setLunchPauseError);
            }} 
            keyboardType="numeric" 
            style={styles.TextInput}
          />
          {lunchPauseError && <Text style={{color: 'red'}}>Ungültige Eingabe für Mittagspause</Text>}

          <Text style={styles.textInputExplainerText}>Ab wie vielen Stunden wird die Mittagspause abgezogen</Text>
          <TextInput 
            placeholder="Ab wie vielen Stunden wird die Mittagspause abgezogen" 
            value={lunchPauseAfter}
            onChangeText={text => {
              setLunchPauseAfterText(text);
              validateNumericInput(text, setLunchPauseAfter, setLunchPauseAfterError);
            }}
            keyboardType="numeric" 
            style={styles.TextInput}  
          />
          {lunchPauseAfterError && <Text style={{color: 'red'}}>Ungültige Eingabe für Mittagspause</Text>}
        </Collapsible>
      </View>

      <View>
        <View style={styles.contentWrapper}>
          <Text style={styles.miniHeader}>Eingabe der Zeiten</Text>
          <View style={styles.picker}>
            <Text>Ankunftszeit: </Text>
            <DateTimePicker
              value={arrivalTime}
              mode="time"
              display="default"
              onChange={onChangeArrivalTime}
            />
          </View>

          <View style={styles.picker}>
            <Text>Will arbeiten bis: </Text>
            <DateTimePicker
              style={{ color: 'red' }}
              value={departureTime}
              mode="time"
              display="default"
              onChange={onChangeDepartureTime}
            />
          </View>

          <Text style={{ marginTop: 10}}>Gewünschte Überstunden: {overtime} Stunden</Text>
          <Slider
            value={overtime}
            onValueChange={value => setOvertime(value)}
            minimumValue={0}
            maximumValue={5}
            step={0.25}
          /> 
        </View>

      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.miniHeader}>Ergebnis</Text>
        <View style={styles.resultsWrapper}>
          <Text style={styles.result}>Du bekommst {formatOvertime(results.currentOvertimeMinutes)} Stunden gutgeschrieben</Text>
          <Text style={styles.result}>Dein Soll ist erfüllt um: {formatTime(results.requiredTime)}</Text>
          <Text style={styles.result}>Bis du die gewünschten Überstunden hast: {formatTime(results.overtimeThreshold)} Uhr</Text>
          <Text style={styles.result}>Die Zeit, bei der man spätestens gehen muss, um die Mittagspause nicht abgezogen zu bekommen: {formatTime(results.lunchThreshold)} Uhr</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function formatTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.abs(minutes) % 60; // Verwende den Absolutwert der Minuten, um negative Minuten zu handhaben
  return `${hours}:${remainingMinutes < 10 ? '0' : ''}${remainingMinutes}`;
}
function formatOvertime(minutes) {
  const hours = minutes / 60;
  return hours.toFixed(2); // Gibt die Stunden mit zwei Dezimalstellen zurück
}
