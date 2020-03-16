module.exports={
    publicPath:process.env.NODE_ENV==="production"?"/app/":"/",
    outputDir:__dirname+"/../server/app"
}