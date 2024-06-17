export default class LoggerPlugin {
  constructor(){
    this.name = 'logger-plugin'
  }

  init($app) {
    console.log('init called with',$app);
    addEventListener("dblclick", (event) => {console.log('dblclick',event)});
  }
}

