/**
 * CEUS rejects an attachment whose file name reaches 80 characters, after the
 * upload has already started; refuse it locally instead.
 */
export const validateCeusFileName = (fileName: string): string => {
  if (fileName.length > 79)
    throw new Error(
      `the document name has ${String(fileName.length)} characters; CEUS accepts at most 79`,
    )
  return fileName
}
