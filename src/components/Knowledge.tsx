import { useEffect, useState } from "react";
import "./styles/Knowledge.css";

interface Category {
  Id: string;
  Name: string;
  UrlHandle: string;
}

interface BlogPost {
  Id: string;
  Tittle: string;
  ShortDescription: string;
  Content: string;
  FeaturedImageUrl: string;
  UrlHandle: string;
  PublishedDate: string;
  Author: string;
  Categories: Category[];
}

interface ApiResponse {
  Success: boolean;
  Message: string;
  Data: BlogPost[];
  StatusCode: number;
}

const Knowledge = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://skms-api.onrender.com/api/BlogPost/latest?count=6")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: ApiResponse) => {
        if (data.Success && data.Data) {
          setBlogs(data.Data);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="knowledge-section section-container" id="knowledge">
      <div className="knowledge-header">
        <h2>
          Knowledge <span>Hub</span>
        </h2>
        <p className="subtitle">
          Always Learning. Always Sharing. Live-fetched articles from my Secure Knowledge Management System.
        </p>
      </div>

      {loading ? (
        <div className="knowledge-grid">
          {[...Array(3)].map((_, i) => (
            <div className="blog-card skeleton" key={i}>
              <div className="skeleton-image"></div>
              <div className="blog-content">
                <div className="skeleton-text short"></div>
                <div className="skeleton-text title"></div>
                <div className="skeleton-text description"></div>
                <div className="skeleton-footer"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error || blogs.length === 0 ? (
        <div className="knowledge-empty">
          <p>Unable to load live articles. Visit the platform directly at:</p>
          <a
            href="https://secure-knowledge-management-systemv-ten.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="read-more-btn"
          >
            SKMS Platform &rarr;
          </a>
        </div>
      ) : (
        <div className="knowledge-grid">
          {blogs.map((blog) => (
            <article className="blog-card" key={blog.Id}>
              <div className="blog-image-wrapper">
                <img
                  className="blog-image"
                  src={blog.FeaturedImageUrl || "/images/placeholder.webp"}
                  alt={blog.Tittle}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/placeholder.webp";
                  }}
                />
              </div>
              <div className="blog-content">
                {blog.Categories && blog.Categories.length > 0 && (
                  <div className="blog-categories">
                    {blog.Categories.map((category) => (
                      <span className="category-badge" key={category.Id}>
                        {category.Name}
                      </span>
                    ))}
                  </div>
                )}
                <h3 className="blog-title">{blog.Tittle}</h3>
                <p className="blog-description">{blog.ShortDescription}</p>
                <div className="blog-footer">
                  <div className="blog-meta">
                    <strong className="blog-author">{blog.Author}</strong>
                    <span className="blog-date">
                      {new Date(blog.PublishedDate).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <a
                    href={`https://secure-knowledge-management-systemv-ten.vercel.app/blog/${blog.UrlHandle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="read-more-btn"
                  >
                    Read &rarr;
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Knowledge;
