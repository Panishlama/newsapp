import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      props.setProgress(10);
      setLoading(true);

      const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&max=${props.pageSize}&apikey=${props.apiKey}`;

      const res = await fetch(url);
      props.setProgress(50);

      const data = await res.json();
      props.setProgress(80);

      setArticles(data.articles || []);

      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonks`;
    updateNews();
    // eslint-disable-next-line
  }, [props.category]);

  return (
    <div className="container my-3">
      <h2
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsMonks - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>

      {loading && <Spinner />}

      <div className="row">
        {!loading && articles.length === 0 && (
          <h5 className="text-center text-muted">No news available.</h5>
        )}

        {articles.map((element) => (
          <div className="col-md-4" key={element.url}>
            <NewsItem
              title={element.title ? element.title : ""}
              description={element.description ? element.description : ""}
              imageUrl={element.image}
              newsUrl={element.url}
              author={element.source.name}
              date={new Date(element.publishedAt).toGMTString()}
              source={element.source.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 10,
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
