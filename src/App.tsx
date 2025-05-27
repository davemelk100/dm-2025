import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CircleDot,
  Quote,
  Menu,
  X,
  Dribbble,
  ArrowUp,
} from "lucide-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { content } from "./content";
import SparklingBackground from "../components/SparklingBackground";
import ImageModal from "../components/ImageModal";
import ArticleModal from "./components/ArticleModal";
import designTokens from "./designTokens.json";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

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

// Add SectionHeader component
const SectionHeader = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
    </div>
  );
};

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    content: string;
    image: string;
    date: string;
  } | null>(null);

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

  const handleArticleClick = (
    e: React.MouseEvent,
    article: { title: string; content: string; image: string; date: string }
  ) => {
    e.preventDefault();
    setSelectedArticle(article);
  };

  const projects = [
    {
      title: "Design Panes",
      description:
        "Various design ideas, principles, concepts, and philosophies with an OpenAI integration.",
      technologies: ["React", "Vite", "Tailwind"],
      demo: "https://designpanes.com",
      image: "/img/design-panes.png",
    },
    {
      title: "Chatbot Samples",
      description:
        "Collection of chatbot interface designs and interaction patterns showcasing various conversational UI approaches.",
      technologies: ["React", "AI", "UI/UX Design"],
      demo: "https://chatbot-samples.netlify.app/",
      image: "/img/agent-ui.png",
    },
    {
      title: "Portfolio",
      description:
        "Previous portfolio with OpenAI and Figma Design Token integrations.",
      technologies: ["Figma", "OpenAI", "React", "Tailwind"],
      demo: "https://rococo-paprenjak-da1be1.netlify.app/",
      image: "/img/old-portfolio.png",
    },
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
        <ThemeToggle />
        <SparklingBackground />
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-[1.6rem] z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-sm hover:scale-110 transition-transform"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
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

          <div className="absolute top-8 left-16 sm:left-20 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center gap-2">
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
              </div>
              {/* <div className="flex items-center gap-2">
                <Train className="h-4 w-4 text-gray-400" />
                <p className="text-xs text-gray-400 font-semibold uppercase">
                  Site inspired by The New York City Subway System
                </p>
              </div> */}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="absolute top-8 left-4 z-50 block lg:hidden"
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
                className="fixed top-24 inset-x-0 bottom-0 z-40 bg-background lg:hidden"
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
                    className="w-16 h-px bg-gray-200 my-4"
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
            className="absolute top-8 right-32 z-10 hidden lg:block"
          >
            <ul className="flex items-center gap-4 sm:gap-6 md:gap-8">
              {content.navigation.links.map((item) => (
                <motion.li
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="text-sm sm:text-base hover:opacity-70 transition-opacity"
                  >
                    {item.text}
                  </button>
                </motion.li>
              ))}
              <li
                className="h-4 w-px bg-gray-200 mx-1 sm:mx-2"
                aria-hidden="true"
              />
              <motion.li whileHover={{ scale: 1.05 }}>
                <a
                  href={content.navigation.social.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <LinkedInLogoIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <a
                  href={content.navigation.social.dribbble.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Dribbble"
                >
                  <Dribbble className="h-5 w-5 sm:h-6 sm:w-6" />
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

            {/* Color Palette */}
            <p className="mt-16 text-xs text-gray-400 font-semibold uppercase">
              Figma Design Token Integration
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-4 flex flex-wrap gap-3"
            >
              {designTokens.colors.map((color) => {
                // Function to determine if text should be light or dark based on background color
                const getTextColor = (hexColor: string) => {
                  const r = parseInt(hexColor.slice(1, 3), 16);
                  const g = parseInt(hexColor.slice(3, 5), 16);
                  const b = parseInt(hexColor.slice(5, 7), 16);
                  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                  return brightness > 128 ? "text-black" : "text-white";
                };

                return (
                  <div
                    key={color.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="relative w-16 h-16 rounded-full shadow-sm"
                      style={{ backgroundColor: color.value }}
                    >
                      <span
                        className={`absolute inset-0 flex items-center justify-center text-[10px] font-medium ${getTextColor(
                          color.value
                        )}`}
                      >
                        {color.value}
                      </span>
                    </motion.div>
                    <span className="text-xs text-muted-foreground">
                      {color.name}
                    </span>
                  </div>
                );
              })}
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

        {/* Articles Section */}
        <section id="articles" className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-8">
            <SectionHeader title="Articles" className="mb-12 text-center" />
            <div className="grid gap-8">
              {content.articles.items.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) =>
                    article.content &&
                    handleArticleClick(e, {
                      title: article.title,
                      content: article.content,
                      image: article.image,
                      date: article.date,
                    })
                  }
                  className="group relative overflow-hidden rounded-lg bg-gray-100/80 p-6 transition-all duration-300 hover:bg-gray-200/80 block"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="mb-4 md:mb-0 aspect-video overflow-hidden rounded-lg cursor-pointer">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="mb-2 text-2xl font-semibold dark:text-black">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <span>Dave Melkonian</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {article.description}
                      </p>
                      <div
                        className="inline-flex items-center text-black hover:text-gray-600 dark:text-black dark:hover:text-gray-700 underline"
                        onClick={() => handleArticleClick(e, article)}
                      >
                        Read Article
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Current Projects Section */}
        <section id="current-projects" className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-8">
            <SectionHeader title="Lab" className="mb-12 text-center" />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <a
                  key={index}
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg bg-gray-100/80 p-6 transition-all duration-300 hover:bg-gray-200/80 block"
                >
                  <div className="mb-4 aspect-video overflow-hidden rounded-lg cursor-pointer">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold dark:text-black">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-black dark:text-black">
                    {project.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-full bg-white px-3 py-1 text-sm dark:text-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center text-black hover:text-gray-600 dark:text-black dark:hover:text-gray-700 underline">
                    View App
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-8">
            <SectionHeader
              title={content.work.title}
              className="mb-8 sm:mb-16"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {content.work.projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index % 2) * 0.2 }}
                  className="group relative border border-gray-200/50 rounded-lg overflow-hidden p-4 bg-gray-100/80"
                >
                  <div
                    className="overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(project.image)}
                  >
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-black">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-black mb-4 dark:text-black">
                          {project.description}
                        </p>
                      )}
                      <p className="text-sm text-black dark:text-black">
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
        <section id="testimonials" className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-8">
            <SectionHeader
              title={content.testimonials.title}
              className="mb-8 sm:mb-16 text-center"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {content.testimonials.items.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-100/80 p-6 sm:p-8 rounded-lg shadow-lg relative"
                >
                  <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary/20 dark:text-white/20 absolute -top-3 -left-3 sm:-top-4 sm:-left-4" />
                  <p className="text-base sm:text-lg mb-6 dark:text-black">
                    {testimonial.quote}
                  </p>
                  <div>
                    <p className="font-medium dark:text-black">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground dark:text-black">
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
            <SectionHeader
              title={content.career.title}
              className="mb-8 sm:mb-16"
            />
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 h-full w-px bg-gray-200" />

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

        {/* Design System Section */}
        <section id="design-system" className="py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-8">
            <SectionHeader
              title="Design System"
              className="mb-4 dark:text-white"
            />
            <p className="text-lg text-muted-foreground mb-12 dark:text-white">
              Integrated with Figma Design Tokens, automatically syncing colors,
              typography, and spacing across design and code.
            </p>

            {/* Color Palette - Design System */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                Color Palette
              </h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="flex flex-wrap gap-3"
              >
                {designTokens.colors.map((color) => {
                  const getTextColor = (hexColor: string) => {
                    const r = parseInt(hexColor.slice(1, 3), 16);
                    const g = parseInt(hexColor.slice(3, 5), 16);
                    const b = parseInt(hexColor.slice(5, 7), 16);
                    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                    return brightness > 128 ? "text-black" : "text-white";
                  };

                  return (
                    <div
                      key={color.name}
                      className="flex flex-col items-center gap-2"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative w-16 h-16 rounded-full shadow-sm"
                        style={{ backgroundColor: color.value }}
                      >
                        <span
                          className={`absolute inset-0 flex items-center justify-center text-[10px] font-medium ${getTextColor(
                            color.value
                          )}`}
                        >
                          {color.value}
                        </span>
                      </motion.div>
                      <span className="text-xs text-muted-foreground">
                        {color.name}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
              <p className="mt-4 text-xs text-gray-400 font-semibold uppercase">
                Figma Design Token Integration
              </p>
            </div>

            {/* Typography */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                Typography
              </h3>
              <div className="space-y-6">
                {designTokens.typography.map((type) => (
                  <motion.div
                    key={type.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg p-6 shadow-sm"
                  >
                    <p
                      style={{
                        fontFamily: type.fontFamily,
                        fontSize: type.fontSize,
                        lineHeight: type.lineHeight,
                        fontWeight: type.fontWeight,
                      }}
                      className="dark:text-black"
                    >
                      The quick brown fox jumps over the lazy dog
                    </p>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm font-medium dark:text-black">
                        {type.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-black">
                        {type.fontSize} / {type.lineHeight} / {type.fontWeight}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                Spacing Scale
              </h3>
              <div className="space-y-4">
                {designTokens.spacing.map((space) => (
                  <motion.div
                    key={space.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div
                      className="bg-primary/20 mr-4"
                      style={{
                        width: space.value,
                        height: space.value,
                      }}
                    />
                    <div>
                      <p className="font-medium text-sm dark:text-black">
                        {space.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-black">
                        {space.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                Buttons
              </h3>
              <div className="space-y-8">
                {/* Variants */}
                <div>
                  <h4 className="text-lg font-medium mb-4 dark:text-white">
                    Variants
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 h-10 px-4 py-2">
                      Default
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-[#EF4444] hover:bg-destructive/90 h-10 px-4 py-2">
                      Destructive
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-white text-gray-900 hover:bg-gray-100 h-10 px-4 py-2">
                      Outline
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-white hover:bg-secondary/80 h-10 px-4 py-2">
                      Secondary
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#9CA3AF] text-white hover:bg-[#9CA3AF]/80 h-10 px-4 py-2">
                      Tertiary
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 h-10 px-4 py-2">
                      Ghost
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2">
                      Link
                    </button>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="text-lg font-medium mb-4 dark:text-white">
                    Sizes
                  </h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 h-9 rounded-md px-3">
                      Small
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 h-10 px-4 py-2">
                      Default
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 h-11 rounded-md px-8">
                      Large
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-primary/90 h-10 w-10">
                      Icon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Modal */}
        {selectedArticle && (
          <ArticleModal
            title={selectedArticle.title}
            content={selectedArticle.content}
            image={selectedArticle.image}
            date={selectedArticle.date}
            onClose={() => setSelectedArticle(null)}
          />
        )}

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal
            imageUrl={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
