import React from 'react' 
import axios from 'axios'
import { Link } from 'react-router-dom'


class Posts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            limit: 5
        }
        this.handleLoad = this.handleLoad.bind(this)
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                this.setState(() => ({
                    posts: response.data
                }))
            })
       
    }

    handleLoad() {
        this.setState((prevState) => ({
            limit: prevState.limit + 5
        }))
    }

    render() {
        return (
            <div>
                <h2>Listing Posts
                    <small> showing {this.state.posts.length !== 0 && this.state.limit} of {this.state.posts.length}</small>
                </h2>
                <ul>
                    {this.state.posts.slice(0, this.state.limit).map(post => <li key={post.id}>
                        <Link to={`/posts/${post.id}`}      target="_blank">
                            {post.title}
                        </Link>
                    </li>)
                    }
                </ul>
                <button onClick={this.handleLoad}>load more</button>
            </div>
        )
    }
}


export default Posts