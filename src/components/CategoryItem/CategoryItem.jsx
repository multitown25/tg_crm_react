import React from 'react';
import Button from "../Button/Button";
import './CategoryItem.css';

const CategoryItem = ({category, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(category);
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}>
                <img src={category.img}/>
            </div>
            <div className={'title'}>{category.title}</div>
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