function A(vim){
    if(vim._text)
        vim._cursor.moveToEOL()
    vim._mode='insert'
    return{
        acceptable:true,
        complete:true,
    }
}
function D(vim,cmd,arg){
    let
        a=vim._cursor.abs,
        b=vim._cursor.lineEnd-1
    vim._registers['"']={
        mode:'string',
        string:vim._trueText.substring(a,b),
    }
    vim._text=
        vim._trueText.substring(0,a)+
        vim._trueText.substring(b)
    return{
        acceptable:true,
        complete:true,
    }
}
function G(vim,cmd,arg){
    arg=arg||vim._cursor._countOfRows
    arg=Math.min(vim._cursor._countOfRows,arg)
    vim._cursor.moveTo(vim._cursor.line(arg-1))
    return{
        acceptable:true,
        complete:true,
    }
}
function I(vim,cmd,arg){
    if(vim._text)
        vim._cursor.moveTo(vim._cursor.lineStart)
    vim._mode='insert'
    return{
        acceptable:true,
        complete:true,
    }
}
function O(vim,cmd,arg){
    vim._mode='insert'
    vim._cursor.moveTo(vim._cursor.lineStart)
    let c=vim._cursor.abs
    vim._text=vim._trueText.substring(0,c)+'\n'+vim._trueText.substring(c)
    return{
        acceptable:true,
        complete:true,
        changed:true,
    }
}
function P(vim,cmd,arg){
    if(!vim._registers['"'])
        return{
            acceptable:true,
            complete:true,
        }
    if(vim._registers['"'].mode=='string'){
        let c=vim._cursor.abs
        vim._text=
            vim._trueText.substring(0,c)+
            vim._registers['"'].string+
            vim._trueText.substring(c)
        vim._cursor.moveTo(c+vim._registers['"'].string.length-1)
    }else if(vim._registers['"'].mode=='line'){
        let c=vim._cursor.lineStart
        vim._text=
            vim._trueText.substring(0,c)+
            vim._registers['"'].string+
            vim._trueText.substring(c)
        vim._cursor.moveTo(vim._cursor.lineStart)
    }
    return{
        acceptable:true,
        complete:true,
        changed:true,
    }
}
function x(vim,cmd,arg){
    return{
        acceptable:true,
        complete:true,
        changed:true,
    }
}
function X(vim,cmd,arg){
    let
        abs=vim._cursor.abs
        ls=vim._cursor.lineStart,
        txt=vim._trueText
    arg=Math.min(abs-ls,Math.max(0,arg||1))
    let
        a=abs-arg,
        b=abs
    vim._text=txt.substring(0,a)+txt.substring(b)
    vim._registers['"']={
        mode:'string',
        string:txt.substring(a,b)
    }
    vim._cursor.moveTo(a)
    return{
        acceptable:true,
        complete:true,
        changed:true,
    }
}
({A,D,G,I,O,P,X})
