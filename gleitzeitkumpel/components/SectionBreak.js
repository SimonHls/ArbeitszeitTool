import React from 'react'
import { useColorScheme, StyleSheet, View } from 'react-native';



function SectionBreak() {

  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    sectionBreak: {
      borderBottomWidth: 1,
      borderBottomColor: colorScheme === 'dark' ? '#818181' : 'lightGray',
      marginTop: 5,
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.sectionBreak}></View>
  )
}

export default SectionBreak

