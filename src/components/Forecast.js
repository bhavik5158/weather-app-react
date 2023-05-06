import React from 'react'
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion'
import { useSelector } from 'react-redux'
import styles from './Currentweather.module.css'

const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function Forecast() {

    const [forecastData, setForecastData] = React.useState([])

    const cityData = useSelector(state => state.city)

    const dayToday = new Date().getDay()
    const dateToday = new Date().getDate()

    React.useEffect(() => {
        cityData.latitude && (
            fetch(`${process.env.REACT_APP_OPENWEATHER_APIURL}/2.5/forecast?units=metric&lat=${cityData.latitude}&lon=${cityData.longitude}&appid=${process.env.REACT_APP_OPENWEATHER_APIKEY}`)
                .then((resp) => resp.json())
                .then((resp) => {
                    if (resp.list.length > 0) {
                        setForecastData(resp.list)
                        // console.table(resp.list)
                    }
                })
                .catch(resp => console.error(resp))
        )
    }, [cityData])

    return (
        <React.Fragment>
            {forecastData.length > 0 &&
                <div className={`container lg:max-w-3xl lg:mt-5 mx-auto mt-8`}>
                    <label htmlFor="" className={`font-bold text-2xl m-3`}>Daily</label>
                    <Accordion allowZeroExpanded>
                        {forecastData.filter(data => new Date(data.dt_txt).getHours()==12 && new Date(data.dt_txt).getDate()!=dateToday).map((ele, indx) => (

                            <AccordionItem key={indx}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <div className={styles.daily_weather}>
                                            <img className={styles.icon_img} src={`/icons/${ele.weather[0].icon}.png`} alt="weather" />
                                            <label htmlFor="" className={styles.day}>{daysInWeek[new Date(ele.dt_txt).getDay()]}</label>
                                            <label htmlFor="" className={styles.description}>{ele.weather[0].description}</label>
                                            <label htmlFor="" className={styles.min_max}>{(ele.main.temp_min)}°C {`/`} {(ele.main.temp_max)}°C</label>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <div className={styles.daily_weather_details}>
                                        <div className={styles.weather_detail_item}>
                                            <label>Feels like:</label>
                                            <span>{(ele.main.feels_like).toFixed(1)}°C</span>
                                        </div>
                                        <div className={styles.weather_detail_item}>
                                            <label>Wind speed:</label>
                                            <span>{ele.wind.speed}m/s</span>
                                        </div>
                                        <div className={styles.weather_detail_item}>
                                            <label>Humidity:</label>
                                            <span>{ele.main.humidity}%</span>
                                        </div>
                                        <div className={styles.weather_detail_item}>
                                            <label>Sea level:</label>
                                            <span>{ele.main.sea_level}m</span>
                                        </div>
                                        <div className={styles.weather_detail_item}>
                                            <label>Clouds:</label>
                                            <span>{ele.clouds.all}%</span>
                                        </div>
                                        <div className={styles.weather_detail_item}>
                                            <label>Pressure:</label>
                                            <span>{ele.main.pressure}hPa</span>
                                        </div>
                                    </div>
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))
                        }
                    </Accordion>
                </div>}
        </React.Fragment>
    )
}

export default Forecast;

