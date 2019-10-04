import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu, Sider } from '../../app-ui';
import routes from '../../configs/routes';

export default props => {
    return(
        <Sider>
            <Menu mode="vertical" theme="dark">
                {
                    routes.filter(route => route.isMenu).map( route => {
                        return(
                            <Menu.Item key={route.path}>
                                <Link to={route.path}>
                                    <Icon type={route.icon}/>
                                    { route.name }
                                </Link>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        </Sider>
    )
}