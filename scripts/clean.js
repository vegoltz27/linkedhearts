var fs = require('fs');

function cleanDir(dirPath) {
  var files;
  var isWin = /^win/.test(process.platform);

  console.log('cleaning: ' + dirPath);

  try { 
    files = fs.readdirSync(dirPath); 
  } catch(e) { 
    return; 
  }

  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      var filePathDelimiter = isWin ? '\\' : '/';
      var filePath = dirPath + filePathDelimiter + files[i];
      var isFile = fs.statSync(filePath).isFile();

      if (isFile && files[i] !== '.gitignore' && files[i] !== 'CNAME') {
        console.log('clean file: ' + files[i]);
        fs.unlinkSync(filePath);
      } else if(!isFile && files[i] !== '.git'){
        console.log('clean dir: ' + files[i]);
        cleanDir(filePath);
        fs.rmdirSync(filePath);
      }
    }
  }
};

cleanDir('build');
