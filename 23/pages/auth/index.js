import React from 'react';
import User from '../../components/User';
const authIndexPage = (props) =>( 
    <div>
        <h1>The Auth main page {props.appName}</h1>
        <User age="23" name="test"/>
    </div>
); 
authIndexPage.getInitialProps = (context)=> { 
    const promise = new Promise ((resolve , reject)=> {
        setTimeout(()=> {
            resolve({appName : "TESTING AUTH"});
        }, 1000); 
    });
    return promise;
}
export default authIndexPage;