import React from 'react';
import { useLocation, useNavigate, useHistory } from "react-router-dom";

import './menu-item.styles.scss';

const MenuItem =({title, imageUrl, size, linkUrl})=> {
    
    const navigate = useNavigate();

    //console.log(match)

    //const history = useHistory();
    //onClick={() => history.push(`${match.url}${linkUrl}`)}
    
    return (
        <div className={`${size} menu-item`} onClick={() => navigate(`/${linkUrl}`)}>
            <div style={{backgroundImage: `url(${imageUrl})`}} className="background-image"/>
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )
} 

export default MenuItem