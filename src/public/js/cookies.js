function setUserCookies(access_token, user){
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user_id", user.id );
    localStorage.setItem("user_nombre", user.nombre );
    localStorage.setItem("user_mail", user.username );
    localStorage.setItem("user_avatar", user.imagenurl );
}

function setChartCookie(){   
    localStorage.setItem("chart_id", carr.id);
}

function deleteUserCookies(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_nombre');
    localStorage.removeItem("user_mail");
    localStorage.removeItem('user_avatar');
}