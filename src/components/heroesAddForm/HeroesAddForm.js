// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {useEffect} from "react";
import {filtersFetched} from "../../actions";

const HeroesAddForm = () => {

    const {filters, filtersLoading} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
    }, []);


    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New Name</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="My name?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="My skills?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">

                <label htmlFor="element" className="form-label">Choose Element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >I own the element...</option>
                    {filters.map((item, i) =>
                        <option key={i} value={item}>{item}</option>
                    )}
                </select>
                <hr/>
                <p className="card-text">... or add a new power!</p>
                <input className={'form-control'} type={'text'}/>

            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;