import axios from "axios";
import randomstring from "randomstring"
import {useDispatch, useSelector} from "react-redux";
import {setAds} from "../redux/linkReducer";
import {setError} from "../redux/errorReducer";
import {setImage} from "../redux/imageReducer";

function RedirectPage() {


        const ads = useSelector((state) => state.link.ads)
        const error = useSelector((state) => state.error.error)
        const path = useSelector((state) => state.image.path)
        const dispatch = useDispatch()

        let key = localStorage.getItem('user_id')
        if (key === null){
            key = randomstring.generate(128)
            localStorage.setItem("user_id", key)
        }


        if ( ads === "" && error === ""){

           axios.get("http://127.0.0.1:8000/api/link" + window.location.pathname, {
                headers: {
                    'user_id': key
                }})
                .then(res => {
                    if (!res.data.commercial){

                        window.location = res.data.link

                    }

                    else{
                        dispatch(setAds("commercial"))
                        const banner = ['img-1.jpg','img-2.jpg','img-3.jpg','img-4.jpg','img-5.jpg'];
                        const count = banner.length;
                        let random = Math.floor(Math.random() * count);
                        dispatch(setImage(banner[random]))
                        setTimeout(function (){
                            window.location = res.data.link

                        },5000)


                    }

            }).catch(err => {

                dispatch(setError(err.response.data.result))


            })

        }

        return error === "" ?
            ads === "commercial" ?
                <div className="gas"><img className="ads" alt="Картинка" src={"/img/" + path} /></div> :
                <div/>
        : <div className="error-message">{error}</div>

}

export default RedirectPage;