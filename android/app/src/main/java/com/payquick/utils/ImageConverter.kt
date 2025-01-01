package com.payquick.utils

import android.graphics.drawable.Drawable
import android.graphics.drawable.BitmapDrawable
import android.graphics.Bitmap
import android.util.Base64
import java.io.ByteArrayOutputStream

/**
 * Interface defining the contract for converting Drawable objects to Base64 strings.
 * This allows for different implementations of image conversion while maintaining a consistent API.
 */
interface ImageConverter {
    /**
     * Converts an Android Drawable to a Base64 encoded string.
     * @param drawable The Android Drawable to convert
     * @return Base64 encoded string representation of the drawable
     * @throws ImageConversionException if conversion fails
     */
    fun convertDrawableToBase64(drawable: Drawable): String
}

/**
 * Implementation of ImageConverter that converts Drawables to Base64 strings using bitmap conversion.
 * This implementation handles both BitmapDrawable and other Drawable types.
 */
class BitmapImageConverter : ImageConverter {
    override fun convertDrawableToBase64(drawable: Drawable): String {
        return try {
            val bitmap = when (drawable) {
                is BitmapDrawable -> drawable.bitmap
                else -> {
                    // For non-bitmap drawables, create a new bitmap and draw the drawable onto it
                    val width = drawable.intrinsicWidth.takeIf { it > 0 } ?: 1
                    val height = drawable.intrinsicHeight.takeIf { it > 0 } ?: 1
                    val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
                    val canvas = android.graphics.Canvas(bitmap)
                    drawable.setBounds(0, 0, canvas.width, canvas.height)
                    drawable.draw(canvas)
                    bitmap
                }
            }
            
            // Convert the bitmap to a byte array using PNG compression
            val byteArrayOutputStream = ByteArrayOutputStream()
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
            val byteArray = byteArrayOutputStream.toByteArray()
            
            // Encode the byte array to Base64
            Base64.encodeToString(byteArray, Base64.DEFAULT)
        } catch (e: Exception) {
            throw ImageConversionException("Failed to convert drawable to base64", e)
        }
    }
}

/**
 * Custom exception class for handling image conversion errors.
 * 
 * @param message The error message describing what went wrong
 * @param cause The underlying exception that caused the conversion failure (optional)
 */
class ImageConversionException(message: String, cause: Throwable? = null) : Exception(message, cause) 