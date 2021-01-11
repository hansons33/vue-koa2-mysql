export default {
    set_token(state,token){
        state.token = token;
        localStorage.setItem('token',token);
        console.log('localStorage保存token成功')
    },
    del_token(state) {
        state.token = "";
        localStorage.setItem('token','');
    },
    setUser(state,username) {
        state.username = username;
        localStorage.setItem('username',username)
    } 
}