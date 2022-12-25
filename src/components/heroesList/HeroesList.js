import {useHttp} from '../../hooks/http.hook';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {heroesFetching, heroesFetched, heroesFetchingError} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state);
    const [char, setChar] = useState([])
    const dispatch = useDispatch();
    const {request} = useHttp();


    const deleteItem = (id) => {
        // const updateHeroes = heroes.filter(item => item.id !== id);
    }

    const updateChar = (data) => {
        setChar(data);
    }

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .then(data => updateChar(data.payload))
            .catch(() => dispatch(heroesFetchingError()))

    }, []);

    // if (heroesLoadingStatus === "loading") {
    //     return <Spinner/>;
    // } else if (heroesLoadingStatus === "error") {
    //     return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    // }
    //
    // const renderHeroesList = (arr) => {
    //
    //     if (arr.length === 0) {
    //         return <h5 className="text-center mt-5">Героев пока нет</h5>
    //     }
    //
    //     return arr.map(({id, ...props}) => {
    //         return <HeroesListItem
    //             key={id}
    //             {...props}
    //             deleteItem={() => deleteItem(id)}/>
    //     })
    // }
    //
    // const elements = renderHeroesList(heroes);

    // const res = !char ? <Spinner/> : <h1>Done</h1>

    const CharList = char.map((item, i) => {
        return (
            <h1>GG</h1>
        )
    })


    const res = !char ? <Spinner/> : null;

    return (
        <ul>
            {/*{elements}*/}
            {res}
            {CharList}

        </ul>
    )
}




export default HeroesList;