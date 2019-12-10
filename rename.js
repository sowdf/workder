const ns = require('node-sketch');
const icons = require('./icons');

async function run() {
  const sketch = await ns.read(__dirname + '/test.sketch');
  const page = sketch.pages[0];

  Object.keys(icons).map(type => {
    const productIcons = icons[type];
    Object.keys(productIcons).map(name => {
      const dirs = ['Device', 'Device1', 'Device2', 'Device3'];
      const [finalName, ext] = productIcons[name].split('.');
      dirs.map(dir => {
        const latestName = `${dir}/${finalName}`;
        /*for(let i=1;i<=10;i++) {
          const symbol = page.get('symbolMaster', latestName);
          if (symbol && symbol.name) {
            symbol.name = `${dir}/${name}`;
          } else {
            console.log(`svgName:${latestName},changeName:${dir}/${name}`);
            break;
          }
        }*/

        const instances = page.getAll('symbolMaster', instance => instance.name.trim() === latestName);
        instances.forEach(instance => (instance.name = `${dir}/${name}`));
      });
    });
  });

  //Save the result

  sketch.save('modified-design' + new Date().getTime() + '.sketch').then(console.log('File saved!!'));
}

run();
