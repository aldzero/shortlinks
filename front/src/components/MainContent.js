import {useDispatch, useSelector} from "react-redux";
import {setInputLink, setShortLink, setLifetime, setCustomName, isCommercial} from "../redux/linkReducer";
import {setError} from "../redux/errorReducer";
import axios from "axios";

function MainContent(){

    const shortLink = useSelector((state) => state.link.shortLink)
    const statsLink = useSelector((state) => state.link.statsLink)
    const inputLink = useSelector((state) => state.link.inputLink)
    const lifetime = useSelector((state) => state.link.lifetime)
    const custom = useSelector((state) => state.link.custom)
    const commercial = useSelector((state) => state.link.commercial)
    const error = useSelector((state) => state.error.error)
    const dispatch = useDispatch()


    function getShortLink(){

        let path = inputLink

        if (inputLink.indexOf("http://") === -1 || inputLink.indexOf("http://") === -1){

            path = "http://" + path

        }
        if (custom !== ""){
            if (!custom.match(/^[0-9a-z]+$/)){
                dispatch(setError("Пользовательское название может содержать только буквы и цифры"))
                return 0
            }
        }

        axios.post("http://127.0.0.1:8000/api/link", {
            "link": path,
            "code": custom,
            "commercial": commercial,
            'lifetime': lifetime
        }).then(res => {
                dispatch(setShortLink(res.data.code));
                dispatch(setError(""))
            }).catch(err =>{
                dispatch(setError(err.response.data.result))
        })
    }

    function setLinkInput(event){
        dispatch(setInputLink(event.target.value))
    }

    function setTime(event){
        if (event.target.value === "Нет"){
            dispatch(setLifetime(null))
        }
        else{
            dispatch(setLifetime(event.target.value))
        }

    }

    function setCustom(event){
        dispatch(setCustomName(event.target.value))
    }

    function setFlagCommercial(){
        dispatch(isCommercial())
    }


    return (
        <main>

            <div className="img-container">
                <img className="header-img" alt="Изображение из шапки" src="/img/header.jpg"/>
            </div>
            <div className="error-input">{error}</div>
            <div className="link-row">
                <input className="link-input"
                       type="url"
                       placeholder="Введите URL-адрес"
                       onChange={setLinkInput}
                       />
                <button onClick={getShortLink} className="link-button">Уменьшить</button>
            </div>
            <div className="option-row">
                <span className="lifetime-label">Срок жизни:</span>
                <select className="lifetime-input" onChange={setTime}>
                    <option>Нет</option>
                    <option>1</option>
                    <option>7</option>
                    <option>30</option>
                </select>
                <span className="day-label">День(Дней)</span>
                <span className="commercial-label">Коммерческая: </span>
                <input type="checkbox" className="commercial-input" onChange={setFlagCommercial}/>
                <input className="custom-input"
                       placeholder="Ваше сокращение, можно оставить пустым"
                       onChange={setCustom}
                />
            </div>
            <div className="short-row">
                <span className="short-label">Ваша сокращенная ссылка: </span>
                <a className="short-link" href={shortLink} target="_blank" rel="noreferrer">{shortLink}</a>
            </div>
            <div className="short-row">
                <span className="short-label">Ссылка на статистику: </span>
                <a className="short-link" href={statsLink} target="_blank" rel="noreferrer">{statsLink} </a>
            </div>
        </main>

    )
}

export default MainContent;