const ns = require('node-sketch');
const icons = require('./icons')

async function run() {
  const sketch = await ns.read(__dirname + '/test.sketch');
  const page = sketch.pages[0];
  console.log(sketch);
  Object.keys(icons).map((type)=>{
    const productIcons = icons[type];
    Object.keys(productIcons).map((name)=>{
      const [finalName,ext] = productIcons[name].split('.');
      page
        .getAll('symbolInstance', instance => instance.symbolMaster.name === finalName)
        .forEach(instance => instance.symbolMaster.name = name);
    })
  });

  //Save the result
  sketch.save('modified-design.sketch')
    .then(console.log('File saved!!'));
}

run();