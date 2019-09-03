import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class PostShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {},
            user: {},
            comments: []
        }
    }

    componentDidMount(){ 
        const id = this.props.match.params.id 
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                // console.log(response.data) 
                const post = response.data 
                this.setState(() => ({ post }))

                // once we get the post info from server then make another api call to fetch the user info
                axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
                    .then(response => {
                        const user = response.data 
                        this.setState(() => ({ user }))
                    })
            })

        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            .then(response => {
                const comments = response.data 
                this.setState(() => ({ comments:comments }))
            })
    } 
    
    render() {
        //console.log(this.props)
        return (
            <div>
               <h2>{this.state.post.title}</h2>
                <p> by <Link to={`/users/${this.state.user.id}`}> { this.state.user.name }</Link></p>
                <p> { this.state.post.body } </p>
                
                <h2>Listing Comments - { this.state.comments.length }</h2>
                <ul>
                    { this.state.comments.map(comment => <li> { comment.name }</li> )}
                </ul>
                <Link to="/posts">back</Link>
            </div>  
        )
    }
}

export default PostShow

