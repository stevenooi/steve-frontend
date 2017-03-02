FUNCTIONALITIES
---------------
- login
- routing - done
- side menu
- rest consumption
- upload files

ARCHITECTURE
------------
- reactjs
- flux
- webpack
- bootstrap
- JSON Web Token (JWT)


PRE-REQUISITES
--------------
- nodejs server with rest and login authentication supported

INSTALLATION
------------
npm install -g yo
npm install -g generator-react-webpack
mkdir react-auth && cd react-auth
yo react-webpack


modify cfg/default.js, add the lines below

{
  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
  loader: 'url-loader?limit=8192'
},
npm install flux react-router bootstrap react-bootstrap keymirror superagent --save
npm install webpack-dev-server webpack bower-webpack-plugin --save
 