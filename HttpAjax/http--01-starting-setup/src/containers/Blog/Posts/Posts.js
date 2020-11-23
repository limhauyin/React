import React , {Component} from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Link } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
import { Route } from 'react-router-dom'; 
class Posts extends Component { 
    state = { 
        posts : []
    }

    componentDidMount() { 
        axios.get('/posts')
        .then(response => { 
            const posts = response.data.slice(0,4);
            const updatedPost = posts.map(
                post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                }
            );
            this.setState({posts : updatedPost});
        }).catch(error => { 
            console.log(error);
            // this.setState({error : true});
        });
    };

    postSelectedHandler = (id) => {
        this.props.history.push({pathname : '/posts/' + id});
        // this.props.history.push('/' + id);
    };
    render () { 
        let posts = <p style={{textAlign:'center'}}> Something went wrong </p>
        if(!this.state.error){ 
            posts = this.state.posts.map(
                post =>  { 
                    return (
                    // <Link to={'/' + post.id} key={post.id}  >
                    <Post 
                    clicked={() =>this.postSelectedHandler(post.id)} 
                    author={post.author} 
                    title={post.title} 
                    />
                    // </Link>
                    );
                }
            );
        }
        return ( 
            <div> 
                <section className="Posts">
                {posts}
                </section>
                <Route path={this.props.match.url + '/:id'}  exact component={FullPost}/>
            </div>
           
        )
    }
}

export default Posts;