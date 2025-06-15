import { useParams, Link, useNavigate } from "react-router-dom";
import { content } from "../content";
import { slugify } from "../utils/slugify";
import ShareWidget from "../components/ShareWidget";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    // Wait for navigation to complete before scrolling
    setTimeout(() => {
      const articlesSection = document.getElementById("articles");
      if (articlesSection) {
        articlesSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Find the article that matches the slug
  const article = content.articles.items.find(
    (article) => slugify(article.title) === slug
  );

  if (!article) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            onClick={handleBackClick}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-8 relative z-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
          <h1 className="text-3xl font-bold dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The article you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const renderContent = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("##")) {
        return (
          <h2
            key={`heading-${index}`}
            className="text-2xl font-bold mt-8 mb-4 dark:text-white"
          >
            {paragraph.replace("##", "").trim()}
          </h2>
        );
      }
      if (paragraph.includes("I mean, make sure my tombstone uses Helvetica")) {
        return (
          <>
            <div
              key={`quote-${index}`}
              className="float-right w-1/2 ml-8 my-4 p-8 border-l-4 border-primary bg-gray-50 dark:bg-gray-800 text-2xl relative font-serif"
            >
              <span className="absolute -top-4 -left-4 text-6xl text-primary/20">
                "
              </span>
              {paragraph}
              <span className="absolute -bottom-8 -right-4 text-6xl text-primary/20">
                "
              </span>
            </div>
            <p key={`paragraph-${index}`} className="mb-4 dark:text-gray-300">
              {paragraph}
            </p>
          </>
        );
      }
      if (paragraph.includes("if your product has 10,000 users")) {
        return (
          <>
            <p key={`paragraph-${index}`} className="mb-4 dark:text-gray-300">
              {paragraph}
            </p>
            <div
              key={`quote-${index}`}
              className="float-right w-1/2 ml-8 my-4 p-8 border-l-4 border-primary bg-gray-50 dark:bg-gray-800 text-2xl relative font-serif"
            >
              <span className="absolute -top-4 -left-4 text-6xl text-primary/20">
                "
              </span>
              Think about it: if your product has 10,000 users and each one
              takes just 10 seconds to decide your experience isn't worth their
              time, that's 10,000 potential customers walking away. What's that
              worth to you?
              <span className="absolute -bottom-8 -right-4 text-6xl text-primary/20">
                "
              </span>
            </div>
          </>
        );
      }
      return (
        <p key={`paragraph-${index}`} className="mb-4 dark:text-gray-300">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 pb-32">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          onClick={handleBackClick}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-8 relative z-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Link>
        <h1 className="text-3xl font-bold dark:text-white mb-4">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
          <span>Dave Melkonian</span>
          <span>•</span>
          <span>{article.date}</span>
        </div>
        {article.image && (
          <div className="float-right ml-8 mb-4 w-1/2 aspect-video overflow-hidden rounded-lg shadow-md">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {renderContent(article.content)}
        </div>
        <div className="relative mt-12">
          <ShareWidget url={window.location.href} />
        </div>
      </div>
    </div>
  );
}
