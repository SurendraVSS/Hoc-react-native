import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';


const API_KEYS = '77f0958748cc0c5e0cf89f9bfa0d3a6f'
//fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEYS}&units=metric`)

const Weather = () => {
    const [city, setCity] = useState(null)
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState(null)
    async function getWeatherData(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=77f0958748cc0c5e0cf89f9bfa0d3a6f&units=metric`)
            .then(response => response.json())
            .then(response => {
                
                if (response.cod == 200) {
                    setWeatherData(response);
                } else {
                    setWeatherData(null)
                    setError(response.message)
                }
                setCity(null)
            }).catch(err => console.log(err))
        // 
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    style={{ backgroundColor: 'pink', width: 300, height: 40, borderRadius: 10 }}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                    placeholder="Enter city name"
                ></TextInput>
                <Button
                    onPress={() => getWeatherData(city)}
                    title="Search"
                    color="red"
                />
            </View>
            {weatherData == null ? <><View><Text>
                {error}
            </Text></View></> : <View>
                <Text> Weather Data of {weatherData?.name}</Text>
                <Text>{weatherData?.main.humidity}</Text>
                <Text>{weatherData?.main.temp}</Text>
                <Text>{weatherData?.weather[0].description}</Text>
            </View>}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Weather;
