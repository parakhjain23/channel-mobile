export const FILE_TYPE = {
  DOCUMENT: 'DOCUMENT',
  PDF: 'PDF',
  IMAGE: 'IMAGE',
  CSV: 'CSV',
  DEFAULT: 'DEFAULT',
};

export function getFileType(filePath?: string): string {
  if (!filePath) return FILE_TYPE.DEFAULT;
  const afterSplit = filePath.split('.');
  const extextion = afterSplit[afterSplit.length - 1].toLowerCase();
  if (extextion == 'pdf') return FILE_TYPE.PDF;
  if (extextion == 'jpeg' || extextion == 'jpg' || extextion == 'png')
    return FILE_TYPE.IMAGE;
  if (extextion == 'txt') return FILE_TYPE.DOCUMENT;
  if (extextion == 'csv') return FILE_TYPE.CSV;
  return FILE_TYPE.DEFAULT;
}

export function getFileNameFromURL(url: string): string {
  const arr = url.split('/');
  return arr[arr.length - 1];
}
