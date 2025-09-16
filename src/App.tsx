import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black/30 backdrop-blur-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-yellow-300 font-bold text-xl">Divine Grace</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-yellow-300 transition-colors">Home</a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors">About</a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors">Services</a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col space-y-2 py-4 bg-black/50 backdrop-blur-sm">
            <a href="#" className="text-white hover:text-yellow-300 transition-colors px-4 py-2">Home</a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors px-4 py-2">About</a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors px-4 py-2">Services</a>
            <a href="#" className="text-white hover:text-yellow-300 transition-colors px-4 py-2">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
};

const Slideshow = () => {
  const slides = [
    {
      id: 1,
      title: "Welcome to Divine Grace",
      description: "Your go-to service for elegant decorations, thoughtful hamper gifts, and stunning photography.",
      bgImage: "url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
    },
    {
      id: 2,
      title: "Exquisite Decorations",
      description: "We transform any event into a breathtaking experience with our unique and stylish décor.",
      bgImage: "url('https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
    },
    {
      id: 3,
      title: "Capture the Moments",
      description: "Our professional photography services ensure that your memories last a lifetime.",
      bgImage: "url('https://images.unsplash.com/photo-1529632316988-4f5a3b5ef01b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
    }
  ];
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);
  
  return (
    <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 flex items-center justify-center bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: slide.bgImage }}
        >
          <div className="text-center p-4 bg-black/50 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-yellow-300 mb-2">{slide.title}</h2>
            <p className="text-white">{slide.description}</p>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-yellow-300' : 'bg-gray-300'}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ServiceCard = ({ 
  title, 
  description,
  fromColor,
  toColor,
  hoverFromColor,
  hoverToColor,
  emoji
}: {
  title: string;
  description: string;
  fromColor: string;
  toColor: string;
  hoverFromColor: string;
  hoverToColor: string;
  emoji: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-gradient-to-br ${isHovered ? `${hoverFromColor} ${hoverToColor}` : `${fromColor} ${toColor}`} p-6 rounded-lg shadow-lg transition-all duration-300 transform ${isHovered ? '-translate-y-2' : ''} border-2 border-yellow-300/20`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center text-5xl mb-4">
        {emoji}
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-yellow-300">{title}</h2>
      <p className="text-black">{description}</p>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 rounded-lg shadow-lg max-w-2xl mx-auto my-12">
      <h2 className="text-3xl font-bold mb-6 text-yellow-300 text-center">Contact Us</h2>
      
      {isSubmitted ? (
        <div className="bg-green-500 text-white p-4 rounded mb-4 text-center">
          Thank you for your message! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-white mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 rounded bg-pink-400 bg-opacity-50 border ${errors.name ? 'border-red-500' : 'border-pink-300'} text-white placeholder-pink-200`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-white mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded bg-pink-400 bg-opacity-50 border ${errors.email ? 'border-red-500' : 'border-pink-300'} text-white placeholder-pink-200`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="message" className="block text-white mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`w-full p-3 rounded bg-pink-400 bg-opacity-50 border ${errors.message ? 'border-red-500' : 'border-pink-300'} text-white placeholder-pink-200`}
              placeholder="Your message..."
            ></textarea>
            {errors.message && <p className="text-red-300 text-sm mt-1">{errors.message}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="mt-16 bg-pink-700 text-white p-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Resources</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-yellow-300 transition">Blog</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">Testimonials</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-yellow-300 transition">Home</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">About</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition">Services</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-2">Contact</h3>
          <p>Divine Grace Services</p>
          <p>Email: <a href="mailto:info@divinegraceservices.com" className="hover:text-yellow-300">info@divinegraceservices.com</a></p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>
      
      <div className="text-center mt-6 pt-4 border-t border-pink-600">
        <p>© {new Date().getFullYear()} Divine Grace. All rights reserved.</p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 pt-24">
        <header className="text-center mb-16">
          <Slideshow />
          <h1 className="text-6xl font-bold mb-4 text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Welcome to Divine Grace</h1>
          <p className="text-xl text-black font-medium bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">Where every experience is valued</p>
        </header>
        
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Hamper Gifts"
            description="We make the most amazing gift packages for all occasions."
            fromColor="from-pink-300"
            toColor="to-pink-400"
            hoverFromColor="from-pink-400"
            hoverToColor="to-pink-500"
            emoji="🎁"
          />
          
          <ServiceCard
            title="Decorations"
            description="Stranded and not sure how to decorate? We got you."
            fromColor="from-pink-400"
            toColor="to-pink-500"
            hoverFromColor="from-pink-500"
            hoverToColor="to-pink-600"
            emoji="🎀"
          />
          
          <ServiceCard
            title="Photography"
            description="Every moment matters. Let us capture your memories."
            fromColor="from-pink-500"
            toColor="to-pink-600"
            hoverFromColor="from-pink-600"
            hoverToColor="to-pink-700"
            emoji="📸"
          />
        </main>
        
        <ContactForm />
      </div>
      
      <Footer />
    </div>
  );
};

export default App;