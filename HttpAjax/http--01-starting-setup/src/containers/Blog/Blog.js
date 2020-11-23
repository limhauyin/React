import React, { Component } from 'react';
import Posts from './Posts/Posts';
import './Blog.css';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
// import NewPost from './NewPost/NewPost'; 
import AsyncComponent from '../../hoc/asyncComponent'
const AsyncNewPost = AsyncComponent(() => {
    return import('./NewPost/NewPost'); 
}); 
class Blog extends Component {
    state = { 
        auth : true 
    };
    render () {
        return (
            <div className="Blog">
                <header >
                    <nav> 
                        <ul> 
                            <li>
                                <NavLink 
                                to="/posts/" 
                                exact
                                activeClassName="my-active"> Posts </NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname: '/new-post'
                                }}> New Post </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header> 
                {/* <Route path="/" exact render = {() => <Posts/>}/> */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    <Route path="/posts"  component={Posts}/>
                    <Route render={() => <h1>NoT FOund</h1>}></Route>
                    {/* <Redirect from="/" to="/posts"  /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;