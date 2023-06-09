import React, {useState} from 'react';
import './CategoryList.css';
import CategoryItem from "../CategoryItem/CategoryItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

import drinks from '../../uploads/27092022-075905-961-cofee.jpg';
import salads from '../../uploads/27092022-080246-373-salad.jpg';
import soups from '../../uploads/27092022-080410-211-soup.png';
import pasta from '../../uploads/27092022-080640-894-pasta.jpg';
import breakfast from '../../uploads/27092022-080913-546-breakfest.jpg';

//import {getCategories} from "../../db/db";

const category = [
    {id: '1', title: 'Напитки', price: 100, img: drinks},
    {id: '2', title: 'Салаты', price: 150, img: salads},
    {id: '3', title: 'Супы', price: 200, img: soups},
    {id: '4', title: 'Паста', price: 250, img: pasta},
    {id: '5', title: 'Завтраки', price: 50, img: breakfast}
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

//const categories = await getCategories();

const CategoryList = () => {
    // const [addedItems, setAddedItems] = useState([]);
    // const {tg, queryId} = useTelegram();
    //
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
    //
    // const onAdd = (category) => {
    //     const alreadyAdded = addedItems.find(item => item.id === category.id);
    //     let newItems = [];
    //
    //     if(alreadyAdded) {
    //         newItems = addedItems.filter(item => item.id !== category.id);
    //     } else {
    //         newItems = [...addedItems, category];
    //     }
    //
    //     setAddedItems(newItems)
    //
    //     if(newItems.length === 0) {
    //         tg.MainButton.hide();
    //     } else {
    //         tg.MainButton.show();
    //         tg.MainButton.setParams({
    //             text: `Купить ${getTotalPrice(newItems)}`
    //         })
    //     }
    // }


    return (
        <div className={'list'}>
            {category.map(item => (
                <CategoryItem
                    category={item}
                    // onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default CategoryList;