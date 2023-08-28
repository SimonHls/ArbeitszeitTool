import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import Collapsible from 'react-native-collapsible';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDynamicStyles } from './AppStyle';
import TimePickerComponent from './components/TimePickerComponent';



import Slider from '@react-native-community/slider';
import { render } from 'react-dom';
import TimePicker from 'react-time-picker';

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

  // styles
  const styles = useDynamicStyles();

  // Zustandsvariable für Ladezustand der Konfiguration
  const [isConfigLoading, setIsConfigLoading] = useState(false);

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
    if (isConfigLoading) return;  // Speicherung verhindern, wenn Konfiguration geladen wird
    try {
      await AsyncStorage.setItem('config', JSON.stringify({
        solarHours,
        breakfastPause,
        lunchPause,
        lunchPauseAfter
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveConfig();
  }, [solarHours, breakfastPause, lunchPause, lunchPauseAfter]);

  useEffect(() => {
    const loadConfig = async () => {
      setIsConfigLoading(true);
      try {
        const value = await AsyncStorage.getItem('config');
        if(value !== null) {
          const config = JSON.parse(value);
          setSolarHours(config.solarHours || 8);
          setBreakfastPause(config.breakfastPause || 15);
          setLunchPause(config.lunchPause || 30);
          setLunchPauseAfter(config.lunchPauseAfter || 6.25);
        } else {
          // Setze hier die Standardwerte
          setSolarHours(8);
          setBreakfastPause(15);
          setLunchPause(30);
          setLunchPauseAfter(6.25);
        }
        // Textwert setzen, damit die Textfelder nicht leer sind
        setSolarHoursText(solarHours.toString());
        setBreakfastPauseText(breakfastPause.toString());
        setLunchPauseText(lunchPause.toString());
        setLunchPauseAfterText(lunchPauseAfter.toString());

      } catch (error) {
        console.log(error);
      }
      setIsConfigLoading(false);
    };

    loadConfig();
  }, []);

  const colorScheme = useColorScheme();

  if (isConfigLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.applicationWrapper}>

      <View style={styles.header}>
        <Text style={styles.headerText}>Gleitzeit-Kumpel</Text>
      </View>

      <ScrollView style={{  }}>

        {/* App content wrapper */}
        <View style={{ marginBottom: 60, paddingLeft: 10, paddingRight: 10, }}> 

          <View>
            <View style={styles.contentWrapper}>
              <View style={styles.inputsWrapper}>
                <Text style={styles.miniHeader}>Arbeitszeiten eingeben</Text>
                <View style={styles.picker}>
                  <Text style={styles.inputText}>Ankunftszeit: </Text>
                  <View style={styles.dateTimePicker}>
                    <TimePickerComponent
                      value={arrivalTime}
                      onChange={onChangeArrivalTime}
                    />
                  </View>
                </View>

                <View style={styles.picker}>
                  <Text style={styles.inputText}>Feierabend: </Text>
                  <View style={styles.dateTimePicker}>
                    <TimePickerComponent
                      value={departureTime}
                      onChange={onChangeDepartureTime}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.result}>
                <Text style={styles.resultText}>Änderung im Stundenkonto:</Text>
                <Text style={styles.adaptiveResultTextValue}>
                {formatOvertime(results.currentOvertimeMinutes)} Std.
                </Text>
              </View>

              <View style={styles.result}>
                <Text style={styles.resultText}>Soll erfüllt um: </Text>
                <Text style={styles.resultTextValue}>{formatTime(results.requiredTime)} Uhr</Text>
              </View>

              <View style={styles.result}>
                <Text style={styles.resultText}>Mittagspause abgezogen um: </Text>
                <Text style={styles.resultTextValue}>{formatTime(results.lunchThreshold)} Uhr</Text>
              </View>

              <Text style={styles.inputText}>Gewünschte Überstunden: {overtime} Stunden</Text>
              <Slider
                value={overtime}
                onValueChange={value => setOvertime(value)}
                minimumValue={0}
                maximumValue={4}
                step={0.25}
                minimumTrackTintColor={ colorScheme === 'dark' ? 'lime' : 'green'} // set the color of the filled portion of the slider bar
                maximumTrackTintColor={ colorScheme === 'dark' ? 'white' : 'lightgray'} // set the color of the unfilled portion of the slider bar
                thumbTintColor={ colorScheme === 'dark' ? 'gold' : 'gray'} // set the color of the slider button
              />

              { overtime > 0 ? (
                <View style={styles.result}>
                  <Text style={styles.resultText}>Überstundenziel erreicht um:</Text>
                  <Text style={styles.resultTextValue}>{formatTime(results.overtimeThreshold)} Uhr</Text>
                </View>
              ) : (<></>)}
            </View>
          </View>


          {/* Konfiguration */}

          <View style={styles.configWrapper}>
            <TouchableOpacity onPress={() => setConfigCollapsed(!configCollapsed)}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center', }}>
                { configCollapsed ? (
                  <>
                    <Text style={styles.miniHeader}>Konfiguration  ausklappen</Text>
                    <Icon
                      style={styles.icon}
                      name={configCollapsed ? 'chevron-down' : 'chevron-up'}
                      size={15}
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.miniHeader}>Konfiguration  einklappen</Text>
                    <Icon
                      style={styles.icon}
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
                value={solarHoursText.toString()}
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
                value={breakfastPauseText.toString()}
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
                value={lunchPauseText.toString()}
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
                value={lunchPauseAfterText.toString()}
                onChangeText={text => {
                  setLunchPauseAfterText(text);
                  validateNumericInput(text, setLunchPauseAfter, setLunchPauseAfterError);
                }}
                keyboardType="numeric" 
                style={styles.TextInput}  
              />
              {lunchPauseAfterError && <Text style={{color: 'red'}}>Ungültige Eingabe für Mittagspause</Text>}

              {/* Funny copyright notice */}
              <Text style={styles.textInputExplainerText}>Mit ❤️ von <Text style={{ fontWeight: 'bold' }}>Simon</Text></Text>
            </Collapsible>
          </View>

        </View>

      </ScrollView>
    </View>
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
