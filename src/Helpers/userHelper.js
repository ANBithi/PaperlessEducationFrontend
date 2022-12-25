
const getCurrentUser = () =>
{
 let user = JSON.parse(localStorage.getItem("userDetails"));
 return user;
}


const getCurrentUserId = () =>
{
 let user = getCurrentUser();
 return user.id;
}

const getFileType = (type) => {
        if(type === 'link')
            return 0;
        if(type === 'photo')
            return 1;
        if (type === 'video')
            return 2;
        if (type === 'pdf')
            return 3;
        else
            return 4;
}

export {getCurrentUser, getCurrentUserId, getFileType}