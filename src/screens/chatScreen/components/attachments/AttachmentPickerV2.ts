import DocumentPicker from 'react-native-document-picker';
import { FileUploadApi } from '../../../../api/attachmentsApi/FileUploadApiV2';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const pickDocument = async (setAttachment:(attachment:[])=>void, setAttachmentLoading:(attachmentLoading:boolean)=>void) => {
  try {
    const Files = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      allowMultiSelection: true,
      readContent: true,
    });
    setAttachmentLoading(true);
    try {
      const FileNames = await FileUploadApi(Files);
      const attachment = FileNames?.map((file, index) => {
        return {
          title: Files[index]?.name,
          key: file,
          resourceUrl: `https://resources.intospace.io/${file}`,
          contentType: Files[index]?.type,
          // size: 18164,
          encoding: '',
        };
      });
      setAttachmentLoading(false);
      setAttachment(prevAttachment=>[...prevAttachment, ...attachment]);
    } catch (error) {
      console.warn(error, 'error');
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      setAttachmentLoading(false);
    } else {
      setAttachmentLoading(false);
    }
  }
};

export const launchCameraForPhoto = (setAttachment:(attachment:[])=>void, setAttachmentLoading:(attachmentLoading:boolean)=>void) => {
  const optionsForCamera = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    quality: 0.5
  };
  launchCamera(optionsForCamera, async data => {
    if (data?.assets) {
      setAttachmentLoading(true);
      try {
        const FileNames = await FileUploadApi(data?.assets);
        const attachment = FileNames?.map((file, index) => {
          return {
            title: data?.assets?.[index]?.fileName,
            key: file,
            resourceUrl: `https://resources.intospace.io/${file}`,
            contentType: data?.assets?.[index]?.type,
            size: 18164,
            encoding: '',
          };
        });
        setAttachmentLoading(false);
        setAttachment(prevAttachment => [...prevAttachment, ...attachment]);
      } catch (error) {
        setAttachmentLoading(false);
        console.warn(error, 'error');
      }
    }
  });
};

export const launchGallery = (setAttachment:(attachment:[])=>void, setAttachmentLoading:(attachmentLoading:boolean)=>void) => {
  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    mediaType:'mixed',
    videoQuality:'low',
    selectionLimit: 0,
    quality: 0.5
  };
  launchImageLibrary(options, async data => {
    if (data?.assets) {
      setAttachmentLoading(true);
      try {
        const FileNames = await FileUploadApi(data?.assets);
        const attachment = FileNames?.map((file, index) => {
          return {
            title: data?.assets?.[index]?.fileName,
            key: file,
            resourceUrl: `https://resources.intospace.io/${file}`,
            contentType: data?.assets?.[index]?.type,
            size: 18164,
            encoding: '',
          };
        });
        setAttachmentLoading(false);
        setAttachment(prevAttachment => [...prevAttachment, ...attachment]);
      } catch (error) {
        setAttachmentLoading(false);
      }
    }
  });
};
