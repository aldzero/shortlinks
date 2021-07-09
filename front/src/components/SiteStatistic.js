import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setStatistic} from "../redux/statsReducer";
import {setError} from "../redux/errorReducer";

function SiteStatistic(){

    const dispatch = useDispatch()
    const statistic = useSelector((state) => state.stats.statistic)
    const error = useSelector((state) => state.error.error)

    if (error === ""){

        axios.get("http://127.0.0.1:8000/api/stats" + window.location.pathname.replace('stats/', ''))
            .then(res => {
                dispatch(setStatistic(JSON.stringify(res.data)))

            })
            .catch(err =>{
                dispatch(setError(err.response.data.result))
            })

    }




    return(

        error !== "" ?
            <div className="error-message">{error}</div>
                    :
        statistic !== ""

            ? <div className="stats-container">
                <div className="table-stats">
                    <div className="table-caption">
                        <span>Журнал посещений:</span>
                    </div>
                    <div className="table-header">
                        <div>Дата посещения</div>
                        <div>Браузер</div>
                    </div>

                    {JSON.parse(statistic).stats.map((el, index) =>
                        <div className="table-body" key={index}>
                            <div>{el.created_at}</div>
                            <div>{el.agent}</div>
                        </div>
                    )}

                </div>

                <div className="user-unique">
                    <p className="users-label">Уникальные пользователи:</p>
                    <div className="counter-container">
                        <p className="users-counter">{statistic !== "" ? JSON.parse(statistic).users : ""}</p>
                    </div>

                </div>
            </div>

            : <div/>

    )

}

export default SiteStatistic;