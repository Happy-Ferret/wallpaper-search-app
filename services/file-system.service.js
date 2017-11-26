import config from './../config/config';
import RNFetchBlob from 'react-native-fetch-blob';
import {CameraRoll, Alert} from 'react-native';

let FileSystemHelper = {

    downloadToDevice: (obj) => {
        RNFetchBlob
            .config({
                path : RNFetchBlob.fs.dirs.DocumentDir + '/temp-images/img-'+ Date.now() + '.jpg'
            })
            .fetch('GET', obj.srcLarge)
            .then((res) => {

                CameraRoll.saveToCameraRoll(obj.srcLarge)
                    .then(()=> {
                        if(config.showDownloadAlert) {
                            Alert.alert(
                                'Download Success',
                                'Downloaded file is available in Photos/Gallery',
                                [
                                    {text: 'Dont show again', onPress: () => obj.dontShowAgainCallback.call(this)},
                                    {text: 'OK'}
                                ],
                                {cancelable: false}
                            );
                            obj.successCallback.call(this);
                        }
                    })
                    .catch((err)=> {console.error(err)});


                /*if(Platform.OS === 'android'){
                    RNFetchBlob.fs.scanFile([ { path : res.path(),  mime : 'image/jpeg' }]);
                }*/
            })
            .catch((err) => {console.error(err)})
    },

    addToFavorites: (obj) => {
        let path = RNFetchBlob.fs.dirs.DocumentDir + '/images';
        RNFetchBlob
            .config({
                path: path + '/img-'+ Date.now() + '.jpg',
            })
            .fetch('GET', obj.srcLarge)
            .then((res) => {})
            .catch((err)=> {})
    },

    removeFromFavorites: (obj) => {
        let path = obj.path.replace('file://', '');
        RNFetchBlob.fs.unlink(path).then(() => {
            obj.successCallback.call(this);
            Alert.alert(
                'Removing Success',
                'File was successfully removed from favorites list',
                [
                    {text: 'OK'}
                ],
                {cancelable: false}
            );
        })
    }

};

export default FileSystemHelper;