module.import('../ascii.js').then(ascii=>{
    function main(vim,val){
        if(!('command' in vim._modeData))
            vim._modeData.command=''
        if(val==ascii.esc){
            vim.mode='normal'
            return
        }
        vim._modeData.command+=val
        let cmd=vim._modeData.command
        if(cmd[0]==':'){
            if(/\r$/.test(cmd)){
                for(let i=1;i<cmd.length;i++){
                    if(cmd[i]=='q')
                        vim.emit('quit')
                    if(cmd[i]=='w')
                        vim.emit('write')
                }
                vim.mode='normal'
            }
        }else if(cmd[0]=='/'){
            if(/\r$/.test(cmd)){
                /*
                vim.searchPattern=vim.command.substring(1)
                vim.gotoNextMatch()
                */
                vim.mode='normal'
            }
        }
    }
    return(vim,val)=>{
        let r=main(vim,val)
        vim._view()
        return r
    }
})