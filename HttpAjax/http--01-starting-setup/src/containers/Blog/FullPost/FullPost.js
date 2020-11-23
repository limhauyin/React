import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = { 
        loadedPost : null
    }

    componentDidMount () { 
        this.loadData();
    }

    componentDidUpdate () { 
        this.loadData();
    }

    loadData (){ 
        if(this.props.match.params.id){
            const postID = this.props.match.params.id;
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != postID)){
                axios.get('/posts/'+ postID)
                .then(response => { 
                    this.setState({loadedPost : response.data});
                });
            }
        }
    }
    deletePostHandler = () => {
        axios.delete('/posts/'+ this.props.match.params.id)
        .then(response => { 
            
        })
    }
    render () {
        let post = <p style={{textAlign:'center'}}>Please select a Post!</p>;
        if(this.props.match.params.id){
            <p style={{textAlign:'center'}}>Loading</p>;
        }
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} lassName="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;