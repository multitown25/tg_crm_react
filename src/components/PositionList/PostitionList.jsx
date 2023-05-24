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

const getTotalPrice = (items = []) => items.reduce((a, c) => a + c.price * c.quantity, 0, 0);

const PositionList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (food) => {
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

        if(addedItems.length === 1) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(addedItems)}`
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