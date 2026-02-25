import React from 'react';
import './SavedCards.scss';

const SavedCards = () => {
    return (
        <section className="dashboard-section">
            <h2 className="section-heading">SAVED CARDS</h2>
            <div className="placeholder-content">
                <p>No saved cards found.</p>
            </div>
        </section>
    );
};

export default SavedCards;
