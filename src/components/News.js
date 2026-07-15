import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroller";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Capitalize first letter helper
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Fetch news for a given page
  const updateNews = async (pageNumber = 1, replace = false) => {
    try {
      props.setProgress(10);
      setLoading(true);

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNumber}&pageSize=${props.pageSize}`;
      const res = await fetch(url);
      props.setProgress(30);

      const data = await res.json();
      props.setProgress(70);

      const newArticles = data.articles || [];

      setArticles((prev) => (replace ? newArticles : [...prev, ...newArticles]));
      setTotalResults(data.totalResults || 0);

      // Check if we should load more
      setHasMore(pageNumber * props.pageSize < data.totalResults);

      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      setHasMore(false);
      props.setProgress(100);
    }
  };

  // Load news when component mounts or category changes
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonks`;
    setArticles([]);
    setPage(1);
    setTotalResults(0);
    setHasMore(true);
    updateNews(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.category]);

  // Infinite scroll load more
  const fetchMoreData = async () => {
    if (loading || !hasMore) return; // Prevent multiple calls
    const nextPage = page + 1;
    setPage(nextPage);
    await updateNews(nextPage); // safely fetch next page
  };

  return (
    <div className="container my-3">
      <h2 className="text-center mb-4" style={{ margin: "35px 0px" , marginTop: "90px" }}>
        NewsMonks - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>

      <InfiniteScroll
        pageStart={1}
        loadMore={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="d-flex justify-content-center my-3" key="loader">
            <Spinner />
          </div>
        }
      >
        <div className="row">
          {articles.length === 0 && !loading && (
            <h5 className="text-center text-muted">No news available.</h5>
          )}
          {articles.map((element) => {
            if (!element) return null;
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author || "Unknown"}
                  date={new Date(element.publishedAt).toGMTString()}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>

      {!hasMore && !loading && (
        <h5 className="text-center mt-3 text-muted">
          Total Results: {totalResults} <br />
          You have reached the end of the news articles.
        </h5>
      )}
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 5,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
