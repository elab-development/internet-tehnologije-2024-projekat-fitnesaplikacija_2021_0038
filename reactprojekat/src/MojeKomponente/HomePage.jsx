import React from 'react';
import './HomePage.css';
import { FaDumbbell, FaUserAlt, FaRegEdit } from 'react-icons/fa';  
import { GiWeightLiftingUp, GiMeal } from 'react-icons/gi';  
import { BiRun } from 'react-icons/bi';  
import { IoIosPeople } from 'react-icons/io';  

const HomePage = () => {
  /////////
  return (
    <div className="homepage-container"> 

      {/* Hero Sekcija */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Transformiši svoje telo & um</h2>
          <p>Kreiraj personalizovane treninge, prati svoj napredak i postigni svoje fitnes ciljeve uz našu sveobuhvatnu platformu.</p>
          <button className="primary-btn">Započni sada</button>
        </div>
        <div className="hero-image">
          <BiRun size={200} color="#e64a19" />
        </div>
      </section>

      {/* Funkcionalnosti */}
      <section className="features-section" id="features">
        <h2>Šta vam nudimo</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaUserAlt size={60} color="#ff5722" />
            <h3>Personalizovani profili</h3>
            <p>Kreiraj profil prilagođen svojim potrebama, prati svoju težinu, mere i ciljeve.</p>
          </div>
          <div className="feature-card">
            <FaDumbbell size={60} color="#e64a19" />
            <h3>Detaljni planovi treninga</h3>
            <p>Pristup bogatoj bazi vežbi, izradi treninge i prati svaku seriju i ponavljanje.</p>
          </div>
          <div className="feature-card">
            <FaRegEdit size={60} color="#ff7043" />
            <h3>Fitnes dnevnik</h3>
            <p>Beleži svoje napredovanje, pratite statistike i motivišite se kroz jasan uvid u sopstveni rast.</p>
          </div>
        </div>
      </section>

      {/* Plans and Exercises */}
      <section className="plans-section" id="plans">
        <h2>Izaberi plan za sebe</h2>
        <div className="plans-grid">
          <div className="plan-card">
            <GiWeightLiftingUp size={60} color="#ff5722" />
            <h3>Početni plan</h3>
            <ul>
              <li>3 treninga nedeljno</li>
              <li>Osnovne vežbe za celo telo</li>
              <li>Uvodni video tutorijali</li>
            </ul>
          
          </div>
          <div className="plan-card">
            <GiMeal size={60} color="#e64a19" />
            <h3>Napredni plan</h3>
            <ul>
              <li>5 treninga nedeljno</li>
              <li>Ciljani treninzi za snagu i izdržljivost</li>
              <li>Napredni video tutorijali</li>
            </ul>
         
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" id="testimonials">
        <h2>Šta kažu naši korisnici</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <IoIosPeople size={60} color="#ff5722" />
            <blockquote>“Od kada koristim ovu aplikaciju, moje zdravlje i forma su na potpuno novom nivou. Treninzi su detaljni, a praćenje napretka mi daje dodatnu motivaciju!”</blockquote>
            <p className="testimonial-name">- Ana, 28</p>
          </div>
          <div className="testimonial-card">
            <IoIosPeople size={60} color="#ff7043" />
            <blockquote>“Personalizacija treninga je sjajna! Mogu odabrati vežbe koje volim i menjati ih kad poželim. Preporučujem svima.”</blockquote>
            <p className="testimonial-name">- Marko, 35</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="join">
        <h2>Prijavi se i započni svoju transformaciju</h2>
        <button className="primary-btn">Kreiraj besplatan nalog</button>
      </section>

     
    </div>
  );
};

export default HomePage;
