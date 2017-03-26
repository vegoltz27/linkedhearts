var fs = require('fs');

function cleanDir(dirPath) {
  var files;

  console.log(dirPath);

  try { 
    files = fs.readdirSync(dirPath); 
  } catch(e) { 
    return; 
  }

  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      var isFile = fs.statSync(filePath).isFile();

      if (isFile && files[i] !== '.gitignore' && files[i] !== 'CNAME') {
        console.log('clean file: ' + files[i]);
        fs.unlinkSync(filePath);
      } else if(!isFile && files[i] !== '.git'){
        cleanDir(filePath);
        fs.rmdirSync(filePath);
      }
    }
  }
};

cleanDir('build');
