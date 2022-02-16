import 'normalize.css'
import styles from '../styles/Home.module.scss'
import {MainLayout} from "../components/MainLayout";
import React, {useEffect, useState} from "react";

let Card = (props) => {

    const checkPackets = (c) => {
        return c.feedData.baseOptions.reduce(function(tot, arr) {
            if (arr.optionName) {
                return tot + arr.optionName + ", ";
            }
            else if (arr.universalOptions){
                return tot + arr.universalOptions.uniOptionName + ", ";
            } else {
                return "";
            }
        },"").toLocaleString('ru-RU')
    }
    const checkCountPackets = (c) => {
        return  c.feedData.baseOptions.reduce(function(tot, arr) {
            return tot + 1;
        },0)
    }
    return <div className={styles.container}>


        {props.cars.list.map(c => <div className={styles.card} key={c._id}>
            <div className={styles.title}>
                <div className={styles.text}>{c.feedData.brandName} {c.feedData.modelName} {c.feedData.equipmentVariantName}</div>
                <div className={styles.year}>
                    {c.feedData.modelYear}
                </div>
                <div className={styles.vin}>
                    {c.vin}
                </div>
            </div>


            <div className={styles.img}>
                {console.log(c)}
                <img alt={"car image"} src={c.photobank.imgs.map(i => i.url)}/>
            </div>
            <div className={styles.eng}>
                <div className={styles.text}>
                    Двигатель
                </div>

                <div className={styles.desc}>
                    {c.feedData.engine.engineCapacity} л <span>/</span> {c.feedData.equipmentVariantEnginePower} лс <span>/</span> {c.feedData.equipmentVariantFuelType}
                </div>

            </div>


            {c.feedData.equipmentVariantTransmission ? <div className={styles.cpp}>
                <div className={styles.text}>
                    КПП / Привод
                </div>
                <div className={styles.desc}>
                    {c.feedData.equipmentVariantTransmission ? c.feedData.equipmentVariantTransmission : null} / {c.feedData.equipmentVariantDriveType ? c.feedData.equipmentVariantDriveType : null}
                </div>
            </div> : null}
            {c.feedData.colorByClassifierName ? <div className={styles.color}>
                <div className={styles.text}>
                    ЦВЕТ
                </div>
                <div className={styles.desc}>
                    {c.feedData.colorByClassifierName ? c.feedData.colorByClassifierName : null}
                </div>
            </div> : null}
            <div className={styles.probeg}>
                <div className={styles.text}>
                    Пробег
                </div>
                <div className={styles.desc}>
                    {c.feedData.autoProbeg} км
                </div>
            </div>
            <div className={styles.packets}>
                <div className={styles.text}>
                    Пакеты
                </div>
                {
                    c.feedData.baseOptions || c.feedData.baseOptions.universalOptions.uniOptionName ? checkPackets(c) ? <>
                        <div className={styles.packetsText}>
                            {checkPackets(c)}
                        </div>
                        <div className={styles.packetsCount}>
                            (+ еще {checkCountPackets(c)} пакета(ов))
                        </div>
                    </>  : <div className={styles.packetsText}>Отсутствуют</div> : 0
                }



            </div>
            <div className={styles.price}>
                <div className={styles.count}>
                    { c.legacy.price.toLocaleString('ru-RU')} <span>₽</span>
                </div>
                <div className={styles.options}>
                    <span>Доп. опции на </span>{
                    c.feedData.noFactoryOptions? c.feedData.noFactoryOptions.packetAcc.reduce(function(tot, arr) {
                        // return the sum with previous value
                        return tot + arr.packetsAccPrice;

                        // set initial value as 0
                    },0).toLocaleString('ru-RU') : 0
                }<span> ₽</span>
                </div>

            </div>
            <div className={styles.foo}>
                {c.feedData.status==="Свободно"? <div className={styles.btn} onClick={()=> {
                    console.log("buy")
                }}>
                    <div className={styles.text} >Купить</div>
                </div> : <div className={styles.btnClose} onClick={()=> {
                    console.log("buy")
                }}>
                    <div className={styles.text} >В поставке</div>
                </div> }

            </div>

        </div>)}

    </div>
}

export default function Home(props) {

    const [cars, setCars] = useState()

    async function load(mark = props.data.marks[0]) {


        const response = await fetch(process.env.API_URL + mark)
        let json = await response.json()
        setCars(json)
    }


    useEffect(() => {
        load()
    }, [])

    return (

        <MainLayout title={'Cars'} className={styles.main}>
            <select aria-label="Default select example" onChange={(e)=>{
                load(e.target.value)
            }} className={styles.menu}>

                {props.data.marks.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {!cars ? <Card cars={props.data.cars}/> : <Card cars={cars}/>}
        </MainLayout>
    )
}

export async function getServerSideProps() {

    const responseMarks = await fetch(process.env.API_URL)
    let json = await responseMarks.json()
    let marks = json.meta.filters.brand
    let endMark = marks[0]
    const response = await fetch(process.env.API_URL + endMark)
    let cars = await response.json()
    let data = {
        marks,
        cars
    }

    return { props: { data } }
}
