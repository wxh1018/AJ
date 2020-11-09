'ui'
let w = floaty.rawWindow(
    <vertical bg="#30ff0000">
        <com.stardust.autojs.core.console.ConsoleView id="ConS" margin="30"/>//
    </vertical>
  );
  w.setSize(800, 400);
  w.setTouchable(false);
  setInterval(()=>{}, 1000) 
  ui.run(() => {
    w.ConS.setConsole(org.autojs.autojs.autojs.AutoJs.getInstance().getGlobalConsole());
    w.ConS.findViewById(org.autojs.autojs.R.id.input_container).setVisibility(android.view.View.GONE);
    
  });

  threads.start(function(){
      while(true){
          log(1)
      }
  })