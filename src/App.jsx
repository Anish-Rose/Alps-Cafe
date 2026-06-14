import { useState, useEffect } from 'react';
import './App.css';
import { config } from './config';
import { menuData } from './menuData';
import { reviewsData } from './reviewsData';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('burgers_sandwiches');
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen to scroll to update header style and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'menu', 'about', 'gallery', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter dynamic menu items where signature toggle is true
  const menuItems = {
    burgers_sandwiches: menuData.filter((item) => item.category === 'burgers_sandwiches' && item.signature),
    starters_fries: menuData.filter((item) => item.category === 'starters_fries' && item.signature),
    momos: menuData.filter((item) => item.category === 'momos' && item.signature),
    beverages: menuData.filter((item) => item.category === 'beverages' && item.signature),
  };

  const tabs = [
    { id: 'burgers_sandwiches', name: 'Burgers & Sandwiches' },
    { id: 'starters_fries', name: 'Starters & Fries' },
    { id: 'momos', name: 'Momo Specialties' },
    { id: 'beverages', name: 'Premium Beverages' },
  ];


  return (
    <>
      {/* Header / Navbar */}
      <header className={`header glass ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="logo-wrapper">
            <img src={config.logoPath} alt={`${config.cafeName} Logo`} className="logo-img" onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=100'}} />
            <span className="logo-text text-gold">{config.cafeName}</span>
          </a>

          <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <li>
              <a 
                href="#home" 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#menu" 
                className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#gallery" 
                className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </a>
            </li>
            <li>
              <a 
                href="#reviews" 
                className={`nav-link ${activeSection === 'reviews' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </li>
            <li className="nav-cta">
              <a href={`tel:${config.phone}`} className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                Call Us
              </a>
            </li>
          </ul>

          <div className="header-actions">
            <button 
              className="theme-toggle-btn" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200" 
          alt="Alps Cafe Vibe" 
          className="hero-bg-image" 
        />
        <div className="hero-container">
          <div className="hero-content animate-fade-in">
            <span className="hero-tagline">Welcome to {config.cafeName}</span>
            <h1 className="hero-title">
              Crafting Premium Coffee & <span className="text-gold font-serif">Unforgettable Vibe</span>
            </h1>
            <p className="hero-description">
              Step into Nagercoil's premium destination for artisanal coffee, handcrafted gourmet snacks, and a cozy ambience designed to inspire.
            </p>
            <div className="hero-actions">
              <a href="#menu" className="btn btn-primary">
                View Menu
              </a>
              <a href={config.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Find Us on Map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Highlights */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
            </div>
            <h3>Specialty Coffee</h3>
            <p>100% premium Arabica beans, roasted to perfection by expert baristas.</p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Gourmet Menu</h3>
            <p>Delectable choice of freshly prepared sandwiches, wraps, and premium desserts.</p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3>Cozy Ambience</h3>
            <p>Sophisticated premium interior, warm lighting, and a very friendly environment.</p>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3>Friendly Staff</h3>
            <p>Dedicated staff providing excellent customer care to make you feel right at home.</p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <div className="section-header">
          <span className="text-gold font-serif" style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Taste our creations</span>
          <h2>Alps Signature Menu</h2>
          <p>Explore our carefully crafted selection of beverages and artisanal culinary delights.</p>
        </div>

        <div className="menu-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`menu-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {menuItems[activeTab].map((item, index) => (
            <div className="menu-item" key={index}>
              <img src={item.img} alt={item.name} className="menu-item-img" />
              <div className="menu-item-info">
                <div className="menu-item-header">
                  <h3 className="menu-item-title">{item.name}</h3>
                  <span className="menu-item-price">{item.price}</span>
                </div>
                <p className="menu-item-description">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="menu-footer-cta">
          <a href={config.menuPdfPath} download className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Full PDF Menu
          </a>
          <p className="menu-notice">*Menu items and pricing are subject to season and availability.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-images">
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600" 
              alt="Alps Cafe Cozy Spot" 
              className="about-img-main" 
            />
            <img 
              src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=300" 
              alt="Pouring Latte" 
              className="about-img-side" 
            />
            <div className="about-stamp font-serif">
              ESTD<br /><span style={{ fontSize: '16px' }}>2026</span><br />ALPS
            </div>
          </div>

          <div className="about-content">
            <span className="text-gold font-serif" style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Our Story</span>
            <h2>Where Premium Beans Meet Artistic Vibe</h2>
            <p className="about-highlight">
              "We believe coffee is not just a drink, it is a creative medium and a beautiful experience."
            </p>
            <p className="about-text">
              Located in the heart of Konam, Nagercoil, Alps Cafe was founded on a passion for outstanding specialty coffee and welcoming lounge aesthetics. We hand-select our coffee beans, source fresh local ingredients, and train our baristas to craft the perfect cup every single time. Whether you need a morning boost, a cozy spot to work, or a space to connect with friends, Alps Cafe is your perfect escape.
            </p>
            <div className="about-features">
              <div className="about-feat-item">
                <span className="about-feat-icon">✓</span> Cozy Lounging
              </div>
              <div className="about-feat-item">
                <span className="about-feat-icon">✓</span> Free High-speed Wi-Fi
              </div>
              <div className="about-feat-item">
                <span className="about-feat-icon">✓</span> Premium Brewing
              </div>
              <div className="about-feat-item">
                <span className="about-feat-icon">✓</span> Friendly Atmosphere
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="section-header">
          <span className="text-gold font-serif" style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Visual Tour</span>
          <h2>Aesthetic Spaces & Delights</h2>
          <p>Take a look at some of the popular spaces, signature drinks, and comforting food at Alps Cafe.</p>
        </div>

        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400" alt="Specialty Coffee Beans" />
            <div className="gallery-overlay">
              <span className="gallery-overlay-icon">☕</span>
              <h3>Specialty Coffee</h3>
              <p>Fresh Brews</p>
            </div>
          </div>

          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400" alt="Fresh Baked Pastry" />
            <div className="gallery-overlay">
              <span className="gallery-overlay-icon">🍰</span>
              <h3>Fresh Pastries</h3>
              <p>Baked Daily</p>
            </div>
          </div>

          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=400" alt="Aesthetic Ambience" />
            <div className="gallery-overlay">
              <span className="gallery-overlay-icon">✨</span>
              <h3>Aesthetic Spaces</h3>
              <p>Relax & Vibe</p>
            </div>
          </div>

          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400" alt="Artisan Hot Latte" />
            <div className="gallery-overlay">
              <span className="gallery-overlay-icon">🎨</span>
              <h3>Latte Art</h3>
              <p>Handcrafted Design</p>
            </div>
          </div>

          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&q=80&w=400" alt="Premium Sandwiches" />
            <div className="gallery-overlay">
              <span className="gallery-overlay-icon">🥪</span>
              <h3>Gourmet Food</h3>
              <p>Savory Bites</p>
            </div>
          </div>

          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400" alt="Chilled Cold Brew" />
            <div className="gallery-overlay">
              <span className="gallery-overlay-icon">❄️</span>
              <h3>Cold Specialties</h3>
              <p>Refreshing Iced Drinks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews-section">
        <div className="section-header">
          <span className="text-gold font-serif" style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Guest Experiences</span>
          <h2>Google Customer Reviews</h2>
          <p>Read honest reviews from our customers who experienced the Alps Cafe vibes and culinary delights.</p>
        </div>

        {config.reviewsWidgetIframe ? (
          <div className="reviews-widget-wrapper glass" style={{ borderRadius: '16px', overflow: 'hidden', padding: '16px', border: '1px solid var(--border-color)', minHeight: '450px' }}>
            <iframe 
              src={config.reviewsWidgetIframe}
              width="100%" 
              height="500px" 
              style={{ border: 'none', background: 'transparent' }}
              title="Google Customer Reviews Widget"
            ></iframe>
          </div>
        ) : (
          <div className="reviews-grid">
            {reviewsData.map((review, i) => (
              <div className="review-card glass" key={i}>
                <div className="review-header">
                  <div className="review-avatar">{review.avatar}</div>
                  <div className="review-meta">
                    <h3>{review.name}</h3>
                    <span>{review.date}</span>
                  </div>
                </div>
                <div className="review-rating">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
                {review.link && (
                  <a href={review.link} target="_blank" rel="noopener noreferrer" className="review-link-anchor">
                    View Original Review 
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href={config.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            Write a Review on Google
          </a>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="contact-section">
        <div className="section-header">
          <span className="text-gold font-serif" style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>Get in Touch</span>
          <h2>We'd Love to Welcome You</h2>
          <p>Drop by, give us a call, or connect with us on social media. We are always ready to serve you.</p>
        </div>

        <div className="contact-container">
          <div className="contact-info-panel">
            <div className="contact-card glass">
              <div className="contact-method">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Address</h3>
                  <p>Alps Cafe, Konam Nagercoil, Kanyakumari District, Tamil Nadu, India.</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Phone / Call</h3>
                  <a href={`tel:${config.phone}`}>{config.phoneDisplay}</a>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>WhatsApp Us</h3>
                  <a href={`https://wa.me/${config.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                    Send a Message
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Instagram</h3>
                  <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer">
                    @alpscafenagercoil
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="map-card">
            <iframe 
              src={config.mapsEmbedUrl}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Alps Cafe Google Maps Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>{config.cafeName}</h3>
            <p>Premium coffee lounge and gourmet diner in Konam, Nagercoil. Dedicated to offering high-quality specialty coffee and rich culinary delights in a relaxed and beautiful space.</p>
            <div className="footer-socials">
              <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href={`https://wa.me/${config.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-hours">
            <h4>Opening Hours</h4>
            <ul className="footer-hours-list">
              <li><span>Monday - Friday</span> <span>10:30 AM - 10:00 PM</span></li>
              <li><span>Saturday</span> <span>10:30 AM - 11:00 PM</span></li>
              <li><span>Sunday</span> <span>11:00 AM - 10:30 PM</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {config.cafeName}. All Rights Reserved.</p>
          <p>Crafted for premium dining & coffee lovers.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
