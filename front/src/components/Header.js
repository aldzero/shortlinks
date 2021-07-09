import {NavLink} from "react-router-dom";

function Header(){


    return(
        <header>
            <div className={"header-content"}>
                <NavLink to="/"><div className="header-title"><span>Сокращалка</span></div></NavLink>
            </div>


        </header>
    )

}

export default Header;