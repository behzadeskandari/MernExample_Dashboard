import React, { useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import  SideDrawer from './sideNavigation';
import { useSelector,useDispatch } from 'react-redux';
import { showToast } from '../../utils/tools';

import { clearNotification } from '../../store/actions/index';


const Header = (props) => {
    console.log('props',props );

    const notifications = useSelector(state => state.notification);
    const dispatch = useDispatch();

    useEffect(() => {
        if (notifications && notifications.error) {
            const msg = notifications.msg ? notifications.msg : 'Error';

            showToast('ERROR',msg);
            dispatch(clearNotification());
        }
        if(notifications && notifications.success){
        
            const msg = notifications.msg ? notifications.msg : 'Error';
            
            showToast('SUCCESS',msg);
            dispatch(clearNotification());
        
        }
    },[notifications])

    return (
        <>
            <nav className="navbar fixed-top">
                
                <Link style={{fontFamily: 'Fredoka One'}} to="/" className="navbar-brand d-flex align-items-center">
                    FlickBase
                </Link> 
                <SideDrawer />

            </nav>
        
        </>
    )
}

export default withRouter(Header);