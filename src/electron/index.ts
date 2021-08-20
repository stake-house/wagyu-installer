import { BrowserWindow, app, globalShortcut } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';

app.on('ready', () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  // once electron has started up, create a window.
  const window = new BrowserWindow({
    width: 900,
    height: 720,
    icon: 'src/images/ethstaker_icon_1.png',

    webPreferences: {
      nodeIntegration: true,

      // TODO: is it a problem to disable this?
      // https://www.electronjs.org/docs/tutorial/context-isolation#security-considerations
      contextIsolation: false,
    },
  });

  // hide the default menu bar that comes with the browser window
  window.setMenuBarVisibility(false);

  globalShortcut.register('CommandOrControl+R', function () {
    console.log('CommandOrControl+R is pressed');
    window.reload();
  });

  // load a website to display
  window.loadURL(`file://${__dirname}/../react/index.html`);
});
