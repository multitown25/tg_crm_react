import React, {useCallback} from 'react';
import Button from "../Button/Button";
import './CategoryItem.css';
import {useTelegram} from "../../hooks/useTelegram";

const CategoryItem = ({category, className, onAdd}) => {
    const {tg, queryId} = useTelegram();

    const onAddHandler = () => {
        onAdd(category);
    }

    const imageClick = () => {
        console.log(category)
        const data = {
            categoryId: category.id,
            queryId
        }

        fetch('http://localhost:5000/api/order/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        window.location.assign(`https://restaurant-react-system.netlify.app/position/${category.id}`);
    }

    return (
        <div className={'category ' + className}>
            <div className={'image__container'}>
                <img src={category.img} onClick={imageClick}/>
            </div>
            <h4 className="card__title__category">{category.title}</h4>
            {/*<div className={'title'}>{category.title}</div>*/}
            {/*<div className={'description'}>{category.description}</div>*/}
            {/*<div className={'price'}>*/}
            {/*    <span>Стоимость: <b>{category.price}</b></span>*/}
            {/*</div>*/}
            {/*<Button className={'add-btn'} onClick={onAddHandler}>*/}
            {/*    Добавить в корзину*/}
            {/*</Button>*/}
        </div>
    );
};

export default CategoryItem;