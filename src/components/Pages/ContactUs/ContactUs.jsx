import React, { useState } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { CiLocationOn, CiMail } from 'react-icons/ci';
import { FiPhoneCall } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './ContactUs.scss';
import Navbar from '../../Navbar/Navbar';

const ContactUs = () => {
  const [phone, setPhone] = useState('');

  return (
    <div className="contact-us-page">
      {/* Top Section */}
      <Navbar />
      <section className="contact-top-section">
        <div className="contact-top-content">
          <div className="text-content">
            <h1>Let's Talk</h1>
            <p>
              Got questions about our natural products, bulk orders, or partnership opportunities? Drop us a message - we're here to help!
            </p>
            <div className="whatsapp-contact">
              <IoLogoWhatsapp className="whatsapp-icon" />
              <span className="country-code">+91</span>
              <span className="phone-number">8589 858 522</span>
            </div>
          </div>

          <div className="form-container">
            <h3>Connect us today!</h3>
            <form>
              <div className="input-group">
                <label>First name</label>
                <input type="text" placeholder="James Jacob" />
              </div>
              <div className="row-group">
                <div className="input-group">
                  <label>Phone</label>
                  <PhoneInput
                    country={'in'}
                    value={phone}
                    onChange={setPhone}
                    placeholder="9234 567 897"
                    inputClass="phone-input"
                    buttonClass="phone-dropdown"
                  />
                </div>
                <div className="input-group">
                  <label>Email ID</label>
                  <input type="email" placeholder="example@youremail.com" />
                </div>
              </div>
              <div className="input-group">
                <label>Message</label>
                <textarea placeholder="Type your message here..." rows="4"></textarea>
              </div>
              <button type="submit" className="submit-btn">Send message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="contact-bottom-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.6341498642735!2d76.2201314!3d10.9909772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7cc3c7d6ba1bb%3A0xeab492dbbe78df6e!2sPerinthalmanna%2C%20Kerala!5e0!3m2!1sen!2sin!4v1709973800202!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map Configuration"
          ></iframe>
        </div>

        <div className="contact-info-container">
          <div className="info-block">
            <div className="icon-wrapper">
              <CiLocationOn />
            </div>
            <div className="info-text">
              <h4>Address</h4>
              <p>Thara Online Store 11/331, Thara Apparetments,<br />Hospital Road, Perinthalmanna, Malappuram,<br />Kerala, India - 679322</p>
            </div>
          </div>

          <div className="info-block">
            <div className="icon-wrapper">
              <CiMail />
            </div>
            <div className="info-text">
              <h4>Emails</h4>
              <p>sales@edhwi.com<br />com@edhwi.com</p>
            </div>
          </div>

          <div className="info-block">
            <div className="icon-wrapper">
              <FiPhoneCall />
            </div>
            <div className="info-text">
              <h4>Call us</h4>
              <div className="phone-list">
                <p>(+91) 8589 8585 22</p>
                <p>(+91) 8589 8585 44</p>
                <p>(+91) 8589 8585 66</p>
                <p>(+91) 8589 8585 88</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
