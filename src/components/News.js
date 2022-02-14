import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 21,
    category: "general",
  };

  articles = [];
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
    };

    document.title = "NewsApp - " + this.capitalize(this.props.category);
  }
  async componentDidMount() {
    this.props.setLoading(10);
    this.setState({
      articles: this.articles,
      loading: true,
      page: 1,
    });
    let urL = this.props.category==='global'?'https://newsapi.org/v2/everything?q=general&apiKey=f9da9cefd5c54983a49ed363e07d279d':`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9da9cefd5c54983a49ed363e07d279d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.props.setLoading(20);
    let data = await fetch(urL);
    this.props.setLoading(50);
    let sample = await data.json();
    this.props.setLoading(70)
    this.setState({
      articles: sample.articles,
      totalResults: sample.totalResults,
      loading: false,
      page: 1,
    });
    this.props.setLoading(100);
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let urL = this.props.category==='global'?'https://newsapi.org/v2/everything?q=general&apiKey=f9da9cefd5c54983a49ed363e07d279d':`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f9da9cefd5c54983a49ed363e07d279d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(urL);
    let sample = await data.json();
    this.setState({
      articles: this.state.articles.concat(sample.articles),
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center">
          NewsApp Top Head Lines - {this.capitalize(this.props.category)}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imgSrc={element.urlToImage}
                      articleLink={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
