var TableRows = React.createClass({
	render: function() {
		
		// set array based on state sortRecent
		if (this.props.sortRecent === true) {
			var users = this.props.recentLeaders;
		} else {
			var users = this.props.alltimeLeaders;
		}

		return (
			<tbody>
				{ users.map(
					function(user, index) {
						var url = 'http://www.freecodecamp.com/' + user.username;
						var date = new Date(user.lastUpdate);
						return 	<tr key={ user.username }>
									<td>{ index + 1 }</td> 
									<td><img src = {user.img} /></td>
									<td><a href={url} target='_blank'>{user.username}</a></td>
									<td>{user.recent}</td>
									<td>{user.alltime}</td>
									<td>{ date.toDateString() }</td>
								</tr>;
						}
					)
				}
			</tbody>
		)
	}
})

var TableHeader = React.createClass({
	handleChange: function() {
		this.props.onChange(this.props.sortRecent);
	},

	render: function() {
		var recent = this.props.sortRecent ? <span onClick={this.handleChange}>Last 30 Days <span className='glyphicon glyphicon-menu-down' aria-hidden='true'></span></span> : <span onClick={this.handleChange}>Last 30 Days</span>;
		var alltime = this.props.sortRecent ? <span onClick={this.handleChange}>All Time</span> : <span onClick={this.handleChange}>All Time <span className='glyphicon glyphicon-menu-down' aria-hidden='true'></span></span>;
		return (
			<thead><tr>
				<th id='rank'>#</th>
				<th id='image'></th>
				<th id='name'>Name</th>
				<th id='recent'>{recent}</th>
				<th id='alltime'>{alltime}</th>
				<th id='update'>Last Update</th>
			</tr></thead>
		)
	}
})

var Page = React.createClass({
	getInitialState: function() {
		return {
			sortRecent: true
		};
	},

	handleChange: function(sortRecent) {
		this.setState({
			sortRecent: !sortRecent
		});
	},

	render: function() {
		return (	
			<div className='container'>
				<h1>freecodecamp Leaderboard</h1>
				<table>
					<TableHeader sortRecent = { this.state.sortRecent } onChange = { this.handleChange }/>
					<TableRows sortRecent = { this.state.sortRecent } recentLeaders = { this.props.recentLeaders } alltimeLeaders = { this.props.alltimeLeaders } />
				</table>
			</div>
		)
	}
})

/*
var TextBoxes = React.createClass({
	  getInitialState: function() {
		return {
		  text: ''
		}
	  },
	  handleChange: function(event) {
		this.setState({
		  text: event.target.value
		});
		var htmltext = marked(this.state.text);
		console.log(htmltext);
		document.getElementById('preview').innerHTML = htmltext;
	  },
	  render: function() {
		return ( 
		  <div className='container'>
			<div id='title' className=''>
			  <h1> Markdown Preview
			  </h1>
			</div>
			<div className='row'>
			  <div className='col-sm-6'>
				<textarea className='form-control' rows='10' onChange={ this.handleChange }>
					  </textarea>
				<div id='syntax'>
				  <h3> Markdown syntax:</h3>
				  <p>
					<div className='inline'> Heading
					  <br /> =======
					</div>
					<div className='inline'> Subheading
					  <br /> ----------
					</div>
					<div className='inline'> ### More hashtags<br/> for deeper headings
					</div>
				  </p>
				  <p>
					<div className='inline'> Separate paragraphs<br/> with an empty line
					</div>
					<div className='inline'> Leave two spaces<br/> to break a line
					</div>
					<div className='inline'> Link: <br/>[Link text](http: //www.url.com)
					</div>
				  </p>
				  <p>
					<div className='inline'> * italic *
					</div>
					<div className='inline'> ** bold **
					</div>
					<div className='inline'> `code`
					</div>
					<div className='inline'> ~~strikethrough~~
					</div>
				  </p>
				  <p>
					<div className='inline'> Bulletted list
					  <br /> * First
					  <br /> * Second
					  <br /> * Third
					  <br />
					</div>
					<div className='inline'> Numbered list
					  <br /> 1. First
					  <br /> 2. Second
					  <br /> 3. Third
					  <br />
					</div>
				  </p>
				</div>
			  </div>
			  <div id='preview' className='col-sm-6'>
			  </div>
			</div>
		  </div>
		  )
		}
	  });
*/

var recentJSON = $.getJSON("http://fcctop100.herokuapp.com/api/fccusers/top/recent", function(){
	var alltimeJSON = $.getJSON("http://fcctop100.herokuapp.com/api/fccusers/top/alltime", function(){
		ReactDOM.render( < Page recentLeaders = {recentJSON.responseJSON} alltimeLeaders = {alltimeJSON.responseJSON} / > ,
  			document.getElementById('container')
			);
	})
})

