require.js([
    'Vim.js',
    'https://cdn.rawgit.com/sytelus/CryptoJS/7fbfbbee0d005b31746bc5858c70c359e98308e5/rollups/aes.js',
],()=>{
    (new Vim).setup(
        document.getElementById('textarea_source')
    )
})
