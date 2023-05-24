import React, {useState} from 'react';
import './PositionList.css';
import PositionItem from "../PositionItem/PostitionItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

import drinks from '../../uploads/27092022-075905-961-cofee.jpg';
import salads from '../../uploads/27092022-080246-373-salad.jpg';
import soups from '../../uploads/27092022-080410-211-soup.png';
import pasta from '../../uploads/27092022-080640-894-pasta.jpg';
import breakfast from '../../uploads/27092022-080913-546-breakfest.jpg';


const position = [
    {id: '1', title: 'Эспрессо', price: 100,},
    {id: '2', title: 'Американо', price: 150},
    {id: '3', title: 'Капучино', price: 200},
    {id: '4', title: 'Редбул', price: 250},
    {id: '5', title: 'Вода', price: 50},
    {id: '6', title: 'Чай чер/зел', price: 80}
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

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

    const onAdd = (position) => {
        const alreadyAdded = addedItems.find(item => item.id === position.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== position.id);
        } else {
            newItems = [...addedItems, position];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {position.map(item => (
                <PositionItem
                    position={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default PositionList;