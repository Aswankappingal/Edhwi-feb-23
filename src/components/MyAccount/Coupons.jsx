import React from 'react';
import './Coupons.scss';

const Coupons = () => {
    const couponsData = [
        {
            id: 1,
            code: 'FIRSTBUY2025',
            discount: '20%',
            description: 'Get extra 30% off on RS. 1490 and above on first purchase',
            validity: '12/2025'
        },
        {
            id: 2,
            code: 'FIRSTBUY2025',
            discount: '20%',
            description: 'Get extra 30% off on RS. 1490 and above on first purchase',
            validity: '12/2025'
        }
    ];

    return (
        <section className="dashboard-section coupons-page">
            <h2 className="section-heading">COUPONS</h2>
            <div className="coupons-list-container">
                {couponsData.map((coupon) => (
                    <div className="coupon-item" key={coupon.id}>
                        <div className="coupon-left">
                            <span className="promo-text">Promo Code</span>
                            <span className="promo-code">{coupon.code}</span>
                        </div>
                        <div className="coupon-divider">
                            <div className="discount-circle">
                                <span className="discount-amount">{coupon.discount}</span>
                                <span className="discount-off">OFF</span>
                            </div>
                        </div>
                        <div className="coupon-right">
                            <p className="coupon-description">{coupon.description}</p>
                            <p className="coupon-validity">
                                <span className="validity-text">Validity</span>
                                <span className="validity-date">{coupon.validity}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Coupons;
