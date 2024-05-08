import React from 'react';

const AuthorizationComponent = ({ component: Component, user, userTypes, ...props }) => {
    var isAuthorized =
		userTypes.some(x => x === user.userType);
    return isAuthorized === true ? <Component  isAuthorized={isAuthorized} {...props} /> : <></>;
};

export { AuthorizationComponent };