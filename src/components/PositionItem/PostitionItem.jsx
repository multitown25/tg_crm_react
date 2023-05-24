import React, {useState} from 'react';
import Button from "../Button/Button";
import './PositionItem.css';

const PositionItem = ({position, className, onAdd, onRemove}) => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
        onAdd(position);
    };
    const handleDecrement = () => {
        setCount(count - 1);
        onRemove(position);
    };

    return (
        <div className={'card ' + className}>
            <span className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}>{count}</span>
            <div className={'image__container'}>
                <img src={position.img}/>
            </div>
            <h4 className="card__title">{position.title}</h4>

            <span className="card__price">{position.price} Р</span>
            {/*<div className={'description'}>{category.description}</div>*/}
            {/*<div className={'price'}>*/}
            {/*    <span>Стоимость: <b>{category.price}</b></span>*/}
            {/*</div>*/}
            <div className="btn-container">
                <Button title={"+"} type={"add"} onClick={handleIncrement} />
                {count !== 0 ? (
                    <Button title={"-"} type={"remove"} onClick={handleDecrement} />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default PositionItem;