const ProductList = React.createClass ({
  getInitialState: function () {
    return {
      sorting: 'descending',
      products: [],
    };
  },
  componentDidMount: function () {
    this.updateState();
  },

  handleClick: function(){
      if (this.state.sorting === 'descending'){
        this.setState({sorting: 'ascending'});
        this.updateState();
      } else {
        this.setState({sorting: 'descending'});
        this.updateState();
      }
    },

  updateState: function(){
    if (this.state.sorting === 'descending'){
      const products = Data.sort((a, b) => {
        return b.votes - a.votes;
          });
            this.setState({ products: products });
          } else {
            const products = Data.sort((b, a) => {
              return b.votes - a.votes;
          });
        this.setState({ products: products });
      }
    },

  handleProductUpVote: function (productId) {
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes + 1;
        return;
      }
    });
    this.updateState();
    console.log(productId + " was upvoted.");
  },

  handleProductDownVote: function (productId) {
    Data.forEach((el) => {
      if (el.id === productId) {
        el.votes = el.votes - 1;
        return;
      }
    });
    this.updateState();
    console.log(productId + " was downvoted.");
  },
  render: function () {
    const products = this.state.products.map((product) => {
    	return (
        <Product
          key={'product-' + product.id}
					id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onVoteUp={this.handleProductUpVote}
          onVoteDown={this.handleProductDownVote}
        />
  	  );
 	 });
		return (
      <div>
        <div>
          <button className={this.state.sorting} onClick={this.handleClick}>Toggle Sorting</button> Currently {this.state.sorting}
        </div>
			  <div className='ui items'>
      	  {products}
			  </div>
      </div>
		);
	}
});

const Product = React.createClass({
	handleUpVote: function () {
		this.props.onVoteUp(this.props.id);
	},
  handleDownVote: function () {
    this.props.onVoteDown(this.props.id);
  },
  render: function () {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon'></i>
            </a>
            <a onClick={this.handleDownVote}>
              <i className='large caret down icon'></i>
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
					</div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
	},
});

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
