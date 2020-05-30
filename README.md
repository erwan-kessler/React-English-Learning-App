English_project

`yarn install` to install
`npm install` to install


`yarn start`    -> start

`yarn web`      -> get the web
`yarn android`
`yarn ios`
`yarn eject`
`yarn devtools`
`yarn buildAndroid`
`yarn buildWeb`

`ncu -u` update to latest
`yarn add <package>` to add to dependencies
`yarn add <package> --dev` to add to dev-dependencies


https://ionicons.com/ to search for new icons


Fix Attempted import error: 'ScreenOrientation' is not exported from './removed'.
(https://github.com/expo/expo/pull/7654 https://github.com/expo/expo-cli/issues/1790)
comment ./node_modules/expo/build/Expo.js ScreenOrientation


Fix errors deprecation : npx react-codemod rename-unsafe-lifecycles


Fix Fontisto error -> downgrade native base to 2.13.8 or cp FontAwesome into Fontisto in node_modules\@expo\vector-icons

Fix Warning: Received `false` for a non-boolean attribute `uppercase`. -> comment uppercase: false in node_modules\native-base\src\basic\Text.js
(https://github.com/GeekyAnts/NativeBase/pull/3111)
