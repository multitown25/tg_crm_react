import React, {useCallback} from 'react';
import Button from "../Button/Button";
import './CategoryItem.css';
import {useTelegram} from "../../hooks/useTelegram";
import {getCategories} from "../../db/db";

const CategoryItem = ({category, className, onAdd}) => {
    const {tg, queryId} = useTelegram();

    const onAddHandler = () => {
        onAdd(category);
    }

    const imageClick = async () => {
        console.log(category)
        const data = {
            categoryId: category.id,
            queryId
        }

        const categoriesFromDB = await getCategories()
        console.log(categoriesFromDB);

        //window.location.assign(`https://restaurant-react-system.netlify.app/position/${category.id}`);

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