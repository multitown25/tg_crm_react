import React, {useState} from 'react';
import './PositionList.css';
import PositionItem from "../PositionItem/PostitionItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

import espresso from '../../uploads/espresso_9575-1.jpg';
import americano from '../../uploads/amerikano1062.jpg';
import capuchino from '../../uploads/capuchino49e2626b85f71806c91e73aec3671e41.jpeg';
import redbull from '../../uploads/redbul6337590357.jpg';
import water from '../../uploads/waterdc284b71c7a6783c5617755262f24dfe.jpg';
import tea from '../../uploads/tea1200-ed4_wide.jpg';
import cesarCur from '../../uploads/cesar_cur.jpg';
import cesarKrev from '../../uploads/cesar_krev.jpg';
import grech from '../../uploads/grecheskiy-salat.jpg';
import novogodni from '../../uploads/novogodni.jpg';
import letni from '../../uploads/letnij-salat.jpg';

import Cart from "../Cart/Cart";
import axios from "axios";

const position = [
    [
        {id: '1', title: 'Эспрессо', price: 100, img: espresso},
        {id: '2', title: 'Американо', price: 150, img: americano},
        {id: '3', title: 'Капучино', price: 200, img: capuchino},
        {id: '4', title: 'Редбул', price: 250, img: redbull},
        {id: '5', title: 'Вода', price: 50, img: water},
        {id: '6', title: 'Чай чер/зел', price: 80, img: tea}
    ],
    [
        {id: '1', title: 'Цезарь с кур', price: 100, img: cesarCur},
        {id: '2', title: 'Цезарь с крев', price: 150, img: cesarKrev},
        {id: '3', title: 'Греческий', price: 200, img: grech},
        {id: '4', title: 'Новогодний', price: 250, img: novogodni},
        {id: '5', title: 'Летний', price: 50, img: letni}
    ],
    [
        {id: '1', title: 'Лапша', price: 100, img: espresso},
        {id: '2', title: 'Борщ', price: 150, img: americano},
        {id: '3', title: 'Сырный крем-суп', price: 200, img: capuchino},
        {id: '4', title: 'Грибной крем-суп', price: 250, img: redbull}
    ],
    [
        {id: '1', title: 'Спагетти с гов', price: 100, img: espresso},
        {id: '2', title: 'Спагетти с кур', price: 150, img: americano},
        {id: '3', title: 'Карбонара', price: 200, img: capuchino},
        {id: '4', title: 'Пенне с бек и кур', price: 250, img: redbull}
    ],
    [
        {id: '1', title: 'Омлет по-мексикански', price: 100, img: espresso},
        {id: '2', title: 'Гурман', price: 150, img: americano},
        {id: '3', title: 'Омлет торнадо', price: 200, img: capuchino},
        {id: '4', title: 'Английский завтрак', price: 250, img: redbull},
        {id: '5', title: 'Ванильные сырники', price: 50, img: water},
        {id: '6', title: 'Фитнес', price: 80, img: tea}
    ]
]


// const soups = [
//     {id: '1', title: 'Лапша', price: 100, img: espresso},
//     {id: '2', title: 'Борщ', price: 150, img: americano},
//     {id: '3', title: 'Сырный крем-суп', price: 200, img: capuchino},
//     {id: '4', title: 'Грибной крем-суп', price: 250, img: redbull}
// ]
//
// const pasta = [
//     {id: '1', title: 'Спагетти с гов', price: 100, img: espresso},
//     {id: '2', title: 'Спагетти с кур', price: 150, img: americano},
//     {id: '3', title: 'Карбонара', price: 200, img: capuchino},
//     {id: '4', title: 'Пенне с бек и кур', price: 250, img: redbull}
// ]
//
// const breakfast = [
//     {id: '1', title: 'Омлет по-мексикански', price: 100, img: espresso},
//     {id: '2', title: 'Гурман', price: 150, img: americano},
//     {id: '3', title: 'Омлет торнадо', price: 200, img: capuchino},
//     {id: '4', title: 'Английский завтрак', price: 250, img: redbull},
//     {id: '5', title: 'Ванильные сырники', price: 50, img: water},
//     {id: '6', title: 'Фитнес', price: 80, img: tea}
// ]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}


const PositionList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const currentLocation = window.location.href;
    const currentId = currentLocation[currentLocation.length - 1];
    console.log(currentId);

    const totalPrice = addedItems.reduce((a, c) => a + c.price * c.quantity, 0);

    const onSendData = useCallback(() => {
        console.log(queryId);
        const data = {
            queryId,
            addedItems,
            totalPrice
        }
        axios.post('http://5.101.51.105:8000/create-order', data, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (food) => {
        tg.MainButton.show();
        const exist = addedItems.find((x) => x.id === food.id);
        if (exist) {
            setAddedItems(
                addedItems.map((x) =>
                    x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
                )
            );
        } else {
            setAddedItems([...addedItems, { ...food, quantity: 1 }]);
        }
    };

    const onRemove = (food) => {
        const exist = addedItems.find((x) => x.id === food.id);
        if (exist.quantity === 1) {
            setAddedItems(addedItems.filter((x) => x.id !== food.id));
        } else {
            setAddedItems(
                addedItems.map((x) =>
                    x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
                )
            );
        }
    };

    const onCheckout = async () => {
        const data = {
            queryId,
            addedItems,
            totalPrice
        }
        // tg.sendData(JSON.stringify(data));

        // await axios.post('http://5.101.51.105:8000/create-order', data, {
        //     headers: {
        //         'Content-Type': 'application/json'},
        // });
        // await axios({
        //     method: "POST",
        //     headers: {'content-type': 'application'},
        //     url: "http://localhost:8000",
        // });
    };



    return (
        <>
            <Cart addedItems={addedItems} onCheckout={onCheckout}/>
            <div className={'list'}>
                {position[currentId - 1].map(item => (
                    <PositionItem
                        position={item}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        className={'item'}
                    />
                ))}
            </div>
        </>
    );
};

export default PositionList;