Promise.all([
    module.repository.Cli,
    module.shareImport('createTextCli/build.js'),
]).then(modules=>{
    let
        Cli=                    modules[0],
        build=                  modules[1]
    function createTextCli(ui){
        let
            cli=new Cli,
            updated=false
        f()
        ui.on('update',()=>updated=false)
        setInterval(f,ui.refreshMinTime)
        return cli
        function f(){
            if(updated)
                return
            cli.clear()
            build(
                cli,
                ui,
                ui._vim._cursor,
                document.activeElement==ui._inputTag&&
                ui._vim.mode!='cmdline'
            )
            cli.flush()
            updated=true
        }
    }
    return createTextCli
})
