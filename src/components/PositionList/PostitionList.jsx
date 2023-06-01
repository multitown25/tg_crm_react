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

const position = [
    {id: '1', title: 'Эспрессо', price: 100, img: espresso},
    {id: '2', title: 'Американо', price: 150, img: americano},
    {id: '3', title: 'Капучино', price: 200, img: capuchino},
    {id: '4', title: 'Редбул', price: 250, img: redbull},
    {id: '5', title: 'Вода', price: 50, img: water},
    {id: '6', title: 'Чай чер/зел', price: 80, img: tea}
]

const salads = [
    {id: '1', title: 'Цезарь с кур', price: 100, img: espresso},
    {id: '2', title: 'Цезарь с крев', price: 150, img: americano},
    {id: '3', title: 'Греческий', price: 200, img: capuchino},
    {id: '4', title: 'Новогодний', price: 250, img: redbull},
    {id: '5', title: 'Летний', price: 50, img: water}
]

const soups = [
    {id: '1', title: 'Лапша', price: 100, img: espresso},
    {id: '2', title: 'Борщ', price: 150, img: americano},
    {id: '3', title: 'Сырный крем-суп', price: 200, img: capuchino},
    {id: '4', title: 'Грибной крем-суп', price: 250, img: redbull}
]

const pasta = [
    {id: '1', title: 'Спагетти с гов', price: 100, img: espresso},
    {id: '2', title: 'Спагетти с кур', price: 150, img: americano},
    {id: '3', title: 'Карбонара', price: 200, img: capuchino},
    {id: '4', title: 'Пенне с бек и кур', price: 250, img: redbull}
]

const breakfast = [
    {id: '1', title: 'Омлет по-мексикански', price: 100, img: espresso},
    {id: '2', title: 'Гурман', price: 150, img: americano},
    {id: '3', title: 'Омлет торнадо', price: 200, img: capuchino},
    {id: '4', title: 'Английский завтрак', price: 250, img: redbull},
    {id: '5', title: 'Ванильные сырники', price: 50, img: water},
    {id: '6', title: 'Фитнес', price: 80, img: tea}
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const PositionList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    // const onSendData = useCallback(() => {
    //     const data = {
    //         products: addedItems,
    //         totalPrice: getTotalPrice(addedItems),
    //         queryId,
    //     }
    //     fetch('http://85.119.146.179:8000/web-data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     })
    // }, [addedItems])
    //
    // useEffect(() => {
    //     tg.onEvent('mainButtonClicked', onSendData)
    //     return () => {
    //         tg.offEvent('mainButtonClicked', onSendData)
    //     }
    // }, [onSendData])

    const onAdd = (food) => {
        const alreadyAdded = addedItems.find(item => item.id === food.id);
        let newItems = [];

        if(alreadyAdded) {
            console.log('exist')
            newItems = addedItems.filter(item => item.id !== food.id);
        } else {
            console.log('no exist')
            newItems = [...addedItems, food];
        }

        setAddedItems(newItems)

        console.log(addedItems.length)
        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
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

    return (
        <div className={'list'}>
            {position.map(item => (
                <PositionItem
                    position={item}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default PositionList;