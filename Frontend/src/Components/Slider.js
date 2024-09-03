import React, { useState } from 'react';
import img1 from "../Bannerimage/1.png";
import img2 from "../Bannerimage/2.png";
import img3 from "../Bannerimage/3.png";
import img4 from "../Bannerimage/4.png";
import img5 from "../Bannerimage/5.png";
import img6 from "../Bannerimage/6.png";
import img7 from "../Bannerimage/7.png";
import { Link } from 'react-router-dom';

export const Slider = () => {
    const [loading, setLoading] = useState(false); // Loading state

    const Data1 = [
        { url: img1 },
        { url: img2 },
        { url: img3 },
        { url: img4 },
        { url: img5 },
        { url: img6 },
        { url: img7 }
    ];

    return (
        <div id="HomeBanner" className="carousel slide  " data-bs-ride="carousel">
            <div className="carousel-indicators">
                {Data1.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#HomeBanner"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                    />
                ))}
            </div>
            <div className="carousel-inner">
                {Data1.map((data, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === 0 ? 'active' : ''}`}
                        data-bs-interval="3000"
                    >
                        <img src={data.url} className="d-block w-100" alt={`Banner ${index + 1}`} />
                    </div>
                ))}
            </div>




        </div>
    );
}
