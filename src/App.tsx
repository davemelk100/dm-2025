import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CircleDot,
  Quote,
  Menu,
  X,
  Dribbble,
  ArrowUp,
  Github,
} from "lucide-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { content } from "./content";
import SparklingBackground from "../components/SparklingBackground";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMobileMenu();
      setShowScrollTop(true);
    }
  };

  const projects = [
    {
      title: "e-commerce site revamp",
      description: "Redesign of a Wordpress site linking to an eBay store",
      technologies: ["Wordpress", "React", "Figma", "Tailwind"],
      github: "https://github.com/yourusername/project1",
      demo: "https://graceful-crostata-2d37d7.netlify.app/",
      image: "https://i.ebayimg.com/images/g/3hMAAOSwehhkKIjR/s-l1600.jpg",
    },
    {
      title: "Portfolio",
      description:
        "Previous portfolio with OpenAI and Figma Design Token integrations.",
      technologies: ["Figma", "OpenAI", "React", "Tailwind"],
      github: "https://github.com/yourusername/project2",
      demo: "https://rococo-paprenjak-da1be1.netlify.app/",
      image: "/img/old-portfolio.png",
    },
    {
      title: "OpenAI UX LMS",
      description:
        "An AI-driven learning management system for user experience knowledge.",
      technologies: ["React", "Vite", "AI", "Tailwind", "OpenAI"],
      github: "https://github.com/yourusername/project3",
      demo: "https://silly-genie-67c18c.netlify.app/",
      image: "/img/ux-lms.png",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-black">
      <SparklingBackground />
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5"
        />

        <div className="absolute top-8 left-4 sm:left-8 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            >
              <CircleDot className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.div>
            <span className="text-base sm:text-lg font-medium">
              {content.siteInfo.title}
            </span>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="absolute top-8 right-4 z-50 block md:hidden"
          aria-label={
            mobileMenuOpen
              ? content.navigation.menuAriaLabels.close
              : content.navigation.menuAriaLabels.open
          }
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </motion.button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed inset-0 z-40 bg-background md:hidden"
            >
              <motion.ul
                variants={staggerChildren}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center justify-center h-full space-y-8 text-lg"
              >
                {content.navigation.links.map((item) => (
                  <motion.li key={item.id} variants={fadeInUp}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="hover:opacity-70 transition-opacity"
                    >
                      {item.text}
                    </button>
                  </motion.li>
                ))}
                <motion.li
                  variants={fadeInUp}
                  className="w-16 h-px bg-border my-4"
                  aria-hidden="true"
                />
                <motion.li variants={fadeInUp}>
                  <a
                    href={content.navigation.social.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="hover:opacity-70 transition-opacity flex items-center gap-2"
                  >
                    <LinkedInLogoIcon className="h-5 w-5" />
                    <span>{content.navigation.social.linkedin.text}</span>
                  </a>
                </motion.li>
                <motion.li variants={fadeInUp}>
                  <a
                    href={content.navigation.social.dribbble.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="hover:opacity-70 transition-opacity flex items-center gap-2"
                  >
                    <Dribbble className="h-5 w-5" />
                    <span>{content.navigation.social.dribbble.text}</span>
                  </a>
                </motion.li>
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-8 right-8 z-10 hidden md:block"
        >
          <ul className="flex items-center gap-8">
            {content.navigation.links.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="hover:opacity-70 transition-opacity"
                >
                  {item.text}
                </button>
              </motion.li>
            ))}
            <li className="h-4 w-px bg-border mx-2" aria-hidden="true" />
            <motion.li whileHover={{ scale: 1.05 }}>
              <a
                href={content.navigation.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity flex items-center gap-2"
              >
                <LinkedInLogoIcon className="h-5 w-5" />
                <span>{content.navigation.social.linkedin.text}</span>
              </a>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }}>
              <a
                href={content.navigation.social.dribbble.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity flex items-center gap-2"
              >
                <Dribbble className="h-5 w-5" />
                <span>{content.navigation.social.dribbble.text}</span>
              </a>
            </motion.li>
          </ul>
        </motion.nav>

        <div className="container mx-auto px-4 sm:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                  },
                },
              }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              {content.siteInfo.subtitle}
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl"
            >
              {content.siteInfo.description}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-px h-8 bg-foreground/20" />
            <span className="text-sm text-muted-foreground">
              {content.siteInfo.scrollText}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Latest Projects Section */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-center mb-12"
          >
            Latest Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Work Section */}
      <section id="work" className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-16">
            {content.work.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {content.work.projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.2 }}
                className="group relative"
              >
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {project.categories}
                    </p>
                  </div>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-16 text-center">
            {content.testimonials.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {content.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 2) * 0.2 }}
                className="bg-background p-6 sm:p-8 rounded-lg shadow-lg relative"
              >
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary/20 absolute -top-3 -left-3 sm:-top-4 sm:-left-4" />
                <p className="text-base sm:text-lg mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline Section */}
      <section id="career" className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-16">
            {content.career.title}
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 h-full w-px bg-border" />

            {/* Timeline Items */}
            <div className="space-y-12 sm:space-y-16">
              {content.career.positions.map((position, index) => (
                <motion.div
                  key={position.title + position.period}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-16"
                >
                  <div
                    className={`md:text-right md:pr-16 ${
                      index % 2 !== 0 ? "md:order-1" : ""
                    }`}
                  >
                    {index % 2 === 0 ? (
                      <>
                        <div className="absolute right-[-9px] md:right-auto md:left-[calc(50%-9px)] top-0">
                          <div className="w-[18px] h-[18px] rounded-full bg-primary" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">
                          {position.title}
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          {position.company}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {position.period}
                        </p>
                      </>
                    ) : (
                      <p className="text-muted-foreground">
                        {position.description}
                      </p>
                    )}
                  </div>
                  <div
                    className={`md:pl-16 ${
                      index % 2 !== 0 ? "md:order-0" : ""
                    }`}
                  >
                    {index % 2 !== 0 ? (
                      <>
                        <div className="absolute right-[-9px] md:right-auto md:left-[calc(50%-9px)] top-0">
                          <div className="w-[18px] h-[18px] rounded-full bg-primary" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">
                          {position.title}
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          {position.company}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {position.period}
                        </p>
                      </>
                    ) : (
                      <p className="text-muted-foreground">
                        {position.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
