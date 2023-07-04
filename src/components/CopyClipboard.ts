import Clipboard from '@react-native-community/clipboard';

class ClipboardUtils {
  static setContent(text: any): any {
    Clipboard.setString(text);
  }

  static getContent() {
    return Clipboard.getString();
  }
}

export default ClipboardUtils;
