import { motion } from "framer-motion";
import {
  CircleDot,
  Dribbble,
  BookOpen,
  Beaker,
  Palette,
  Layers,
  Briefcase,
  Quote,
  ArrowUp,
} from "lucide-react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { content } from "./content";
import SparklingBackground from "../components/SparklingBackground";
import { BrowserRouter as Router } from "react-router-dom";
import ImageModal from "../components/ImageModal";
import ArticleModal from "./components/ArticleModal";
import designTokens from "./designTokens.json";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Article from "./pages/Article";
import { slugify } from "./utils/slugify";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<{
    title: string;
    content: string;
    image?: string;
    date?: string;
  } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    if (location.pathname !== "/") {
      // If we're not on the main page, navigate to main page first
      navigate("/");
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // If we're already on the main page, just scroll
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
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
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100">
      <ThemeToggle />
      <SparklingBackground />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* Hero Section */}
              <section className="relative h-screen flex items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-background/5"
                />

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
              </section>

              {/* Articles Section */}
              <section id="articles" className="py-12 sm:py-20">
                <div className="container mx-auto px-4 sm:px-8">
                  <SectionHeader
                    title="Articles"
                    className="mb-12 text-center"
                  />
                  <div className="grid gap-8">
                    {[...content.articles.items]
                      .sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime()
                      )
                      .map((article, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-lg bg-gray-100/80 p-6 transition-all duration-300 hover:bg-gray-200/80"
                        >
                          <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="mb-4 md:mb-0 aspect-video overflow-hidden rounded-lg">
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
                              <Link
                                to={`/article/${slugify(article.title)}`}
                                className="inline-flex items-center text-black hover:text-gray-600 dark:text-black dark:hover:text-gray-700 underline"
                              >
                                Read Article
                              </Link>
                            </div>
                          </div>
                        </div>
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
                          <ArrowUp className="ml-1 h-4 w-4" />
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
                        transition={{
                          duration: 0.6,
                          delay: (index % 2) * 0.2,
                        }}
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
                          <ArrowUp className="opacity-0 group-hover:opacity-100 transition-opacity" />
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
                          initial={{
                            opacity: 0,
                            x: index % 2 === 0 ? -50 : 50,
                          }}
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
                    Integrated with Figma Design Tokens, automatically syncing
                    colors, typography, and spacing across design and code.
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
                          const brightness =
                            (r * 299 + g * 587 + b * 114) / 1000;
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
                              {type.fontSize} / {type.lineHeight} /{" "}
                              {type.fontWeight}
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
            </>
          }
        />
        <Route path="/article/:slug" element={<Article />} />
      </Routes>

      {selectedArticle && (
        <ArticleModal
          title={selectedArticle.title}
          content={selectedArticle.content}
          image={selectedArticle.image}
          date={selectedArticle.date}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{
          opacity: isScrolled ? 1 : 0,
          y: isScrolled ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:opacity-80 transition-opacity"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </motion.button>

      {/* Bottom Navigation Container */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <div className="bg-black px-8 py-4 flex items-center justify-between">
          {/* Logo/Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
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
                <CircleDot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </motion.div>
              <span className="text-base sm:text-lg font-medium text-white">
                {content.siteInfo.title}
              </span>
            </motion.button>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden sm:block"
          >
            <ul className="flex items-center gap-4 sm:gap-6 md:gap-8">
              {content.navigation.links.map((item) => (
                <motion.li
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="text-sm sm:text-base text-white hover:opacity-70 transition-opacity"
                  >
                    {item.text}
                  </button>
                </motion.li>
              ))}
              <li
                className="h-4 w-px bg-gray-600 mx-1 sm:mx-2"
                aria-hidden="true"
              />
              <motion.li whileHover={{ scale: 1.05 }}>
                <a
                  href={content.navigation.social.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity text-white"
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
                  className="hover:opacity-70 transition-opacity text-white"
                  aria-label="Dribbble"
                >
                  <Dribbble className="h-5 w-5 sm:h-6 sm:w-6" />
                </a>
              </motion.li>
            </ul>
          </motion.nav>

          {/* Mobile Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="sm:hidden"
          >
            <ul className="flex items-center gap-6">
              <motion.li whileHover={{ scale: 1.05 }}>
                <button
                  onClick={() => handleNavClick("articles")}
                  className="text-white hover:opacity-70 transition-opacity"
                  aria-label="Articles"
                >
                  <BookOpen className="h-6 w-6" />
                </button>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <button
                  onClick={() => handleNavClick("current-projects")}
                  className="text-white hover:opacity-70 transition-opacity"
                  aria-label="Lab"
                >
                  <Beaker className="h-6 w-6" />
                </button>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <button
                  onClick={() => handleNavClick("work")}
                  className="text-white hover:opacity-70 transition-opacity"
                  aria-label="Design"
                >
                  <Palette className="h-6 w-6" />
                </button>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <button
                  onClick={() => handleNavClick("testimonials")}
                  className="text-white hover:opacity-70 transition-opacity"
                  aria-label="Testimonials"
                >
                  <Quote className="h-6 w-6" />
                </button>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <button
                  onClick={() => handleNavClick("career")}
                  className="text-white hover:opacity-70 transition-opacity"
                  aria-label="Career"
                >
                  <Briefcase className="h-6 w-6" />
                </button>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <button
                  onClick={() => handleNavClick("design-system")}
                  className="text-white hover:opacity-70 transition-opacity"
                  aria-label="Design System"
                >
                  <Layers className="h-6 w-6" />
                </button>
              </motion.li>
            </ul>
          </motion.nav>
        </div>
      </div>
    </div>
  );
}

// Wrap the App with Router at the root level
export default function AppWithRouter() {
  return (
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  );
}
