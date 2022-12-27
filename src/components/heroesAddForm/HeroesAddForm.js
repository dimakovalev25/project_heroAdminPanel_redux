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
import {useEffect, useState} from "react";
import {filtersFetched, addHeroes} from "../../actions";

const HeroesAddForm = () => {

    const {filters, filtersLoading} = useSelector(state => state);
    const {heroes, heroesLoadingStatus} = useSelector(state => state);
    const [newHeroes, setNewHeroes] = useState({
        id: "",
        name: "",
        description: "",
        element: ""
    })

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
    }, []);

    const onNewHeroesName = (e) => {
        setNewHeroes({
            ...newHeroes,
            "id": e.target.value,
            "name": e.target.value,
        })
    }

    const onNewHeroesDescr = (e) => {
        setNewHeroes({
            ...newHeroes,
            "description": e.target.value,
        })
    }

    const onNewHeroesElement = (e) => {
        setNewHeroes({
            ...newHeroes,
            "element": e.target.value,
        })
    }


    const addHeroes = (async (newHeroes) => {
        let response = await fetch('http://localhost:3001/heroes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newHeroes)
        });

        let result = await response.json();
        console.log(result.message);
    });

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New Name</label>
                <input
                    onChange={onNewHeroesName}
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
                    onChange={onNewHeroesDescr}
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
                    onChange={onNewHeroesElement}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >I own the element...</option>
                    {filters.map((item, i) =>
                        <option
                            key={i}
                            value={item}>{item}</option>
                    )}
                </select>

                {/*<hr/>*/}
                {/*<p className="card-text">... or add a new power!</p>*/}
                {/*<input className={'form-control'} type={'text'}/>*/}

            </div>

            <button
                onClick={() => dispatch(addHeroes(newHeroes))}
                // onClick={addHeroes}
                type="submit"
                className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;