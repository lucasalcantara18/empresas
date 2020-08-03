import React from 'react';
import './styles.css';
import logo2 from '../../assets/logo-home.png';



const ListItem = ({enterprise_name, enterprise_type, city, share_price, country, onPress}: any) => {
    

    return (
        <div id="item-list-component" className="col-xl-12 d-flex mt-2 mb-2" onClick={onPress} style={{background: '#F0F0F5'}}>
            <div className="col-xl-4 p-3 d-flex justify-content-center align-items-center div-background-green">
                <img src={logo2} width={300} alt="Ioasys"/>
            </div>
            <div className="col-xl-8 p-3 d-flex justify-content-between align-items-center">
                <div className="col">
                    <p className="title">{enterprise_name}</p>
                    <p className="business">{enterprise_type.enterprise_type_name}</p>
                    <p className="location">{city}</p>
                </div>
                <div className="col">
                    <p className="title">{share_price}</p>
                    <p className="location">{country}</p>
                </div>
            </div>
        </div>
    );

    
    
}

export default ListItem;