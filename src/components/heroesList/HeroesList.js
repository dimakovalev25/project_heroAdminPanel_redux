import {useHttp} from '../../hooks/http.hook';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {heroesFetched, heroesFetching, heroesFetchingError} from '../../actions';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state);
    const {activefilters} = useSelector(state => state);

    const dispatch = useDispatch();
    const {request, requestDel} = useHttp();

    const deleteItem = (id) => {
        requestDel(`http://localhost:3001/heroes/${id}`)
            .then(data => dispatch(heroesFetched(data)))
    }


    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

    }, []);

    let arr = heroes;

    if (activefilters !== 'all') {
        arr = heroes.filter(item => item.element === activefilters)
    } else {
        arr = heroes;
    }

    const CharList = arr.map((item, i) => {

        let elementClassName;
        switch (item.element) {
            case 'fire':
                elementClassName = 'bg-danger bg-gradient';
                break;
            case 'water':
                elementClassName = 'bg-primary bg-gradient';
                break;
            case 'wind':
                elementClassName = 'bg-success bg-gradient';
                break;
            case 'earth':
                elementClassName = 'bg-secondary bg-gradient';
                break;
            default:
                elementClassName = 'bg-warning bg-gradient';
        }
        console.log(arr)


        return (
            <li key={i}
                className={`card flex-row mb-4 shadow-lg text-black ${elementClassName}`}>
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

    // const res = !char ? <Spinner/> : null;

    return (
        <ul>
            {CharList}
            {/*{res}*/}
        </ul>
    )
}


export default HeroesList;