
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useDispatch, useSelector} from "react-redux";
import {useHttp} from "../../hooks/http.hook";
import {useEffect} from "react";
import {filtersFetched} from "../../actions";

const HeroesFilters = () => {
    const {filters, filtersLoading} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    useEffect(() => {
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
    }, []);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">

                <p className="card-text">Filter heroes!</p>
                <div className="btn-group">

                    {filters.map((item, i) => (
                        <HeroesFilterBtn
                            key={i}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}



const HeroesFilterBtn = ({item}) => {

    let elementClassName;

    switch (item) {
        case 'fire':
            elementClassName = 'btn btn-danger';
            break;
        case 'water':
            elementClassName = 'btn btn-primary';
            break;
        case 'wind':
            elementClassName = 'btn btn-success';
            break;
        case 'earth':
            elementClassName = 'btn btn-secondary';
            break;
        default:
            elementClassName = 'btn btn-outline-dark';
    }

    return (
        <button className={elementClassName}>{item}</button>
    )

}

export default HeroesFilters;