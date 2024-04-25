package com.openmobilehub.android.rn.maps.core.utils

import android.graphics.Bitmap
import android.net.Uri
import android.util.Base64
import java.io.ByteArrayOutputStream
import java.io.Closeable
import java.io.File
import java.io.FileNotFoundException
import java.io.FileOutputStream
import java.io.IOException

object BitmapUtils {
  private const val FORMAT_BASE_64 = "base64"
  private const val FORMAT_JPG = "jpg"
  private const val FORMAT_PNG = "png"

  private fun closeQuietly(closeable: Closeable?) {
    if (closeable == null) return
    try {
      closeable.close()
    } catch (ignored: IOException) {
    }
  }

  @Throws(IOException::class, FileNotFoundException::class)
  fun convertBitmap(bitmap: Bitmap, resultFormat: String, directory: File): String {
    if (resultFormat == FORMAT_BASE_64) {
      val outputStream = ByteArrayOutputStream()
      bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)

      closeQuietly(outputStream)

      val bytes = outputStream.toByteArray()

      return Base64.encodeToString(bytes, Base64.NO_WRAP)
    }

    val outputStream: FileOutputStream
    val tempFile = File.createTempFile("OmhMapSnapshot", ".$resultFormat", directory)
    outputStream = FileOutputStream(tempFile)

    val compressFormat =
      if (resultFormat == FORMAT_JPG) Bitmap.CompressFormat.JPEG else Bitmap.CompressFormat.PNG
    bitmap.compress(compressFormat, 100, outputStream)

    closeQuietly(outputStream)

    return Uri.fromFile(tempFile).toString()
  }
}
