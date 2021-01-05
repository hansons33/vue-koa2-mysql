class DataUtils{
    constructor(){}
    getDateTime(time){
        let nowDate = new Date()
        let passDate = new Date(parseInt(time))
        let nY = nowDate.getFullYear()
        let nM = nowDate.getMonth() + 1
        let nD = nowDate.getDate()
        let Y = passDate.getFullYear()
        let M = passDate.getMonth() + 1
        let D = passDate.getDate()
        let H = passDate.getHours()
        let m = passDate.getMinutes()
        m = m >= 10 ? m: '0' + m
        if (nY + nM + nD == Y + M + D){ 
            return +H+':'+m
        }else if(nY == Y ){
            return M + '/' + D + ' ' + H + ':' + m
        }else{
            return Y + '/' + M + '/' + D
        }
    }
}
export default new DataUtils();