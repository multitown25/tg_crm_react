import React from 'react';
import Button from "../Button/Button";
import './PositionItem.css';

const PositionItem = ({position, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(position);
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}/>
            <div className={'title'}>{position.title}</div>
            {/*<div className={'description'}>{category.description}</div>*/}
            {/*<div className={'price'}>*/}
            {/*    <span>Стоимость: <b>{category.price}</b></span>*/}
            {/*</div>*/}
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default PositionItem;