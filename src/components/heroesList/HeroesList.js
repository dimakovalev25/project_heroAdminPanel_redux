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
    const {request, requestDel} = useHttp();

    const deleteItem = (id) => {
        setChar(char.filter(item => item.id !== id));
        requestDel(`http://localhost:3001/heroes/${id}`)
            .then(data => dispatch(heroesFetched(data)))
            // .then(data => updateChar(data.payload))
        console.log(heroes)
        // console.log(id)
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

    const updateHeroes = (() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .then(data => updateChar(data.payload))
    });

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
            <li key={i}
                className={`card flex-row mb-4 shadow-lg text-black`}>
                <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
                     className="img-fluid w-25 d-inline"
                     alt="unknown hero"
                     style={{'objectFit': 'cover'}}/>
                <div className="card-body">

                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-text">{item.description}</p>
                </div>
                <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button
                    onClick={() => deleteItem(item.id)}
                    type="button"
                    className="btn-close btn-close"
                    aria-label="Close"></button>
            </span>
            </li>
        )
    })

    const res = !char ? <Spinner/> : null;

    return (
        <ul>
            {/*{elements}*/}
            {res}
            {CharList}
            <button
                onClick={updateHeroes}
            >Update</button>
        </ul>
    )
}


export default HeroesList;