import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Linkedin, Mail, Menu, X, ArrowDown, Download } from 'lucide-react';
import * as THREE from 'three';
import { ToastContainer, toast } from 'react-toastify';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create geometry
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      // Clean up Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Handle scroll events to update active section
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);

      const sections = ['home', 'about', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle contact form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setContactForm(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // Handle contact form submission
  const handleSubmit = () => {
    console.log('Form submitted:', contactForm);
    // In a real application, you would send this data to your backend
    
    
toast("Sorry, please connect through email!");
    setContactForm({ name: '', email: '', message: '' });
  };

  // Handle resume download
  const handleResumeDownload = () => {
    // In a real implementation, this would be a link to an actual file
    // For demo purposes, we're showing an alert
   

    // In a real application, you would use something like:
    // window.open('/path-to-your-resume.pdf', '_blank');
  };

  // Projects data
  const projects = [
    {
      id: 1,
      title: "GrideSync-Project Management-Collaburation Platform",
      description: "A full-featured project management and collaboration tool inspired by Slack and Jira, developed using Clean Architecture. It offers real-time chat, notifications, channels for team communication, and a Kanban board for task tracking. The architecture enforces separation of concerns with clear domain, application, infrastructure, and presentation layers—making the system scalable, maintainable, and easy to test.",
      tech: ["MongoDB", "Typescript", "Express","Node-mailer", "React", "Node.js", "Redux", "Stripe", "Socket.io", "Jwt", "Clean-Architeture"],
      github: "https://github.com/yourusername/ecommerce-app",
      live: "https://aesthetic-torrone-aa4b8f.netlify.app/",
      youtube: "https://youtu.be/FNXuEPsCn-s?si=4jhqdY5q-gvL2zFi",
      image: "/image/Gridesync.JPG",
      status: "Working-Progress"
    },
    {
      id: 2,
      title: "Lux-ous-Ecommerce Website",
      description: "A feature-rich e-commerce website developed with MVC architecture, offering a seamless shopping experience for users and robust control for admins. The user side includes Google authentication, shopping cart, Razorpay integration, a built-in wallet, and other essential features. The admin side provides tools for cart management, user control, and downloadable sales reports, ensuring efficient store operations and analytics.",
      tech: ["MongoDB", "Express", "React", "Node.js", , "Chart.js", "Google-Auth", "Razorpay", "MVC-Architeture"],
      github: "https://github.com/afsalabdurahman/Nodejs-Ecommerce",
      live: "https://your-social-dashboard.com",
      youtube: "https://youtu.be/4kcLcJ0JsCo?si=g2RbDZcjy7NX6bWo",
      image: "/image/screencapture-localhost-3000-2025-03-07-11_27_39.png"
    }
  ];

  // Navigation links
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };


  //Mini
  const miniProjects = [
    {
      id: 1,
      title: "WebScraping-tool",
      description: "Scrap data from Amazon and Flipcart shows here",
      tech: ["React", "Express", "JsDom"],
      github: "https://github.com/yourusername/weather-app",
      //live: "https://your-weather-app.com",
      icon: "☁️",
      youtube: "https://youtu.be/iMGl7F9LDe0?si=j9cW8Y6SK8FJMVkY",
    },
    {
      id: 2,
      title: "Flight Booking App",
      description: "Simple Flight Booking App – Step-by-Step Guide to Purchasing a Ticket",
      tech: ["React", "Local Storage", , "Tailwind CSS",],
      github: "https://github.com/afsalabdurahman/testing-Flightbooking-app",
      live: "https://testing-flightbooking-app.vercel.app/",
      icon: "✈️"
    },
    {
      id: 3,
      title: "Clone-Finacle banking software",
      description: "Simple Clone of Finacle banking software",
      tech: ["Express-generator", "Nodejs", "MySql", "HBS"],
      github: "https://github.com/afsalabdurahman/finacle-node-version",
      youtube: "https://youtu.be/YgLo4Hdkjno?si=WnpYDWe48SGW9bSx",
      icon: "📝"
    },
    {
      id: 4,
      title: "Clone-Netflix",
      description: "Search engine for recipes with filtering by ingredients and diets.",
      tech: ["React", "Spoonacular API", "CSS Grid"],
      github: "https://github.com/afsalabdurahman/projects-Olx-and-Netflix",
      youtube: "https://youtu.be/VTJ5hTk0FK0?si=AacrCsFr2047nkus",
      icon: "📺"

    },
    {
       id: 5,
      title: "Static-web",
      description: "A static website for interior designers to showcase their projects.",
      tech: ["React", "CSS Grid","Google-form"],
      github: "https://github.com/afsalabdurahman/lattice-interior",
      live: "https://afsalabdurahman.github.io/lattice-interior/",
      icon: "🎨"

    },

    {
       id: 6,
      title: "Profile-Maker",
      description: "A simple profile Management system",
      tech: ["React", "Tailwind CSS",],
      github: "https://github.com/afsalabdurahman/UserProfileManagement",
      icon: "🧑",
      youtube:"https://youtu.be/fHhy72cqjFA?si=5URIel2ppNv8sGH5"
    }

  ];

  //
  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans">
      {/* Three.js Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 opacity-50"
      />

      {/* Navigation */}
      <nav className={`cursor-pointer fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${scrollPosition > 50 ? 'bg-slate-900/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto flex justify-between items-center ">
          <a href="#home" className="text-2xl font-bold text-blue-500 ">
            Afsal<span className="text-white">KP</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 cursor-pointer">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`${activeSection === link.id ? 'text-blue-400' : 'text-gray-300 hover:text-white'} transition-colors`}
              >
                {link.label}
              </button>
            ))}
          </div>
<ToastContainer />
          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-800 shadow-lg py-4 px-6">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`${activeSection === link.id ? 'text-blue-400' : 'text-gray-300 hover:text-white'} transition-colors`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="container mx-auto text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-blue-500">MERN Stack</span> Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
            Building modern web applications with MongoDB, Express, React, and Node.js
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-colors font-medium"
            >
              View Projects
            </button>
            <a href="/pdf/Resume.pdf">
            <button
              onClick={handleResumeDownload}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md transition-colors font-medium"
            >
              <Download size={18} className="mr-2" />
              Download Resume
            </button></a>
            <button
              onClick={() => scrollToSection('contact')}
              className="border border-blue-500 text-blue-500 hover:bg-blue-500/10 px-8 py-3 rounded-md transition-colors font-medium"
            >
              Contact Me
            </button>
          </div>
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="text-blue-500" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            About <span className="text-blue-500">Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img
                src="/image/Dev.png"
                alt="Developer Profile"
                className="rounded-xl w-full max-w-md mx-auto shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Full Stack Web Developer</h3>
              <p className="text-gray-300 mb-6">
                I'm a passionate MERN stack developer with expertise in building modern, responsive,
                and scalable web applications. With a strong foundation in both frontend and backend
                technologies, I create seamless user experiences powered by robust server architectures.
              </p>
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-blue-400">My Skills</h4>
                <div className="flex flex-wrap gap-3">
                  {["MongoDB", "Express", "React", "Node.js", "JavaScript", "TypeScript", "Redux", "Tailwind CSS", "Git", "RESTful APIs", "GraphQL"
,"Clean-Architeture","Git","Postman","Figma","Prompt-Engineering"].map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">
                  <Github size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-500 transition-colors">
                  <Mail size={24} />
                </a>
              </div>
              <button
                onClick={handleResumeDownload}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors font-medium"
              >
                <Download size={18} className="mr-2" />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">



        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            My <span className="text-blue-500">Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-800/70 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/10 transition-all group"
              >
                <div className="relative overflow-hidden group">
                  {project.status ? (
                    <div className="absolute top-2 right-2 inline-block bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-medium z-10">
                      🚧 Work in Progress
                    </div>
                  ) : null}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="text-sm bg-slate-700 text-blue-300 px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-blue-500 transition-colors"
                    >
                      <Github size={18} className="mr-1" />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-blue-500 transition-colors"
                    >
                      <ExternalLink size={18} className="mr-1" />
                      <span>Live</span>
                    </a>
                    <a
                      href={project.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-blue-500 transition-colors"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 mr-1"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* MIni */}
      <section className="py-20 px-6 bg-slate-800/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Mini <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Small but functional applications showcasing specific skills and technologies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {miniProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-800/70 rounded-lg p-6 shadow-lg hover:shadow-blue-500/10 transition-all hover:translate-y-1 border border-slate-700 h-full flex flex-col"
              >
                <div className="text-4xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-700 text-blue-300 px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 mt-auto pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-blue-500 transition-colors"
                  >
                    <Github size={16} className="mr-1" />
                    <span>Code</span>
                  </a>
                  {project.live ?
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-blue-500 transition-colors"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      <span>Live</span>
                    </a> : null}
                  {project.youtube ?
                    <a
                      href={project.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-300 hover:text-blue-500 transition-colors"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 mr-1"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <span>Demo</span>
                    </a>
                    : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Mini end */}
      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Get In <span className="text-blue-500">Touch</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="text-gray-300 mb-8">
                I'm currently available for freelance work and full-time positions.
                If you have a project that needs a skilled MERN stack developer or
                just want to say hello, feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-blue-500 mr-4" />
                  <span>afsalkp4343@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Github className="text-blue-500 mr-4" />
                  <span>https://github.com/afsalabdurahman</span>
                </div>
                <div className="flex items-center">
                  <Linkedin className="text-blue-500 mr-4" />
                  <span>https://www.linkedin.com/in/afsal-abdurahman-452720193?trk=contact-info</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-6 shadow-lg">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-gray-300">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-gray-300">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-gray-300">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="How can I help you with your project?"
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-colors font-medium"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-6 border-t border-slate-800">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} AfsalKP. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}