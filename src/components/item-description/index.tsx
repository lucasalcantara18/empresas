import React from 'react';
import './styles.css';
import logo2 from '../../assets/logo-home.png';



const ItemDescription = ({description}: any) => {
    

    return (
        <div id="item-description" className={`container mt-3`} style={{background: '#F0F0F5'}}>
            <div className="row">
                <div className="col-xl-12 div-padding-details">
                    <div className="row">
                        <div className="col-xl-12 d-flex div-background-green justify-content-center align-items-center">
                            <img className="img-padding-details" src={logo2} width={300} alt="Ioasys"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 p-3 d-flex justify-content-between align-items-center">
                            <span className="details">{description}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

    
    
}

export default ItemDescription;