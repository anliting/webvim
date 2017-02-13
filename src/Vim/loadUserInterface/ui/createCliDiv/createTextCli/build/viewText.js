Promise.all([
    module.shareImport('viewText/wrap.js'),
]).then(modules=>{
    let
        wrap=       modules[0]
    function uiText(ui,text,targetWidth,vc){
        let res=wrap(ui,text,targetWidth,vc)
        if(ui.height){
            checkScroll(ui,res.cursorViewRow)
            res.res=cut(ui,res.res)
        }
        return res.res
    }
    return uiText
})
function checkScroll(ui,cursorViewRow){
    if(ui._wrapMethodData._scroll+ui.height-1<=cursorViewRow)
        ui._wrapMethodData._scroll=cursorViewRow-(ui.height-1)+1
    if(cursorViewRow<ui._wrapMethodData._scroll)
        ui._wrapMethodData._scroll=cursorViewRow
}
function cut(ui,res){
    let s=ui._wrapMethodData._scroll
    return res.map(l=>{
        if(l.endRow<=s||s+ui.height-1<=l.startRow)
            return
        l.rows=l.rows.map((r,i)=>{
            if(!(s<=l.startRow+i&&l.startRow+i<s+ui.height-1))
                return
            return r
        }).filter(r=>r!=undefined)
        return l
    }).filter(l=>l!=undefined)
}