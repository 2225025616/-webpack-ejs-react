export default class FileUtil {
  static humanableSize(bytes) {
    if (!bytes || bytes === 0) return '0 B'
    var k = 1024, // or 1000
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }

  static extension(fileName) {
    if (!fileName)
      return "";

    const index = fileName.lastIndexOf(".");
    if (index >= 0) {
      return fileName.substring(index + 1);
    } else {
      return "";
    }
  }

  static humanableSizeMB(bytes) {
    if (!bytes || bytes === 0) return '0'
    var k = 1024 * 1024;
    return (bytes / k).toPrecision(3);
  }
}

