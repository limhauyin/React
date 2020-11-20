import React, {Component} from 'react'; 
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = { 
        showSideDrawer : false
    }
    sideDrawerClosedHandler = () => { 
        this.setState({showSideDrawer:false});
    }
    sideDrawerToogleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer}
        });
    }
    render () { 
        return (
            <Aux>
                <Toolbar DrawerToggleClicked={this.sideDrawerToogleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}></SideDrawer>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>  
        )
    }
}

export default Layout ; 