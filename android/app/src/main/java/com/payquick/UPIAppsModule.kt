package com.payquick

import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.payquick.utils.BitmapImageConverter
import com.payquick.utils.ImageConversionException

/**
 * React Native module for handling UPI (Unified Payments Interface) related operations.
 * This module provides functionality to discover and list UPI-enabled apps installed on the device.
 *
 * @param reactContext The React Native application context
 */
class UPIAppsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    // Instance of BitmapImageConverter to handle app icon conversion
    private val imageConverter = BitmapImageConverter()

    /**
     * Required override to specify the module name for React Native
     * @return The module name that will be accessible in JavaScript
     */
    override fun getName() = "UPIAppsModule"

    /**
     * Retrieves a list of all UPI-enabled apps installed on the device.
     * For each app, it collects:
     * - Package name
     * - App name
     * - App icon (converted to base64)
     *
     * @param promise React Native promise to return the result or error
     */
    @ReactMethod
    fun getUPIApps(promise: Promise) {
        try {
            // Get the Android package manager to query installed apps
            val packageManager = reactApplicationContext.packageManager
            val upiIntent = Intent()
            upiIntent.data = Uri.parse("upi://pay")

            // Query for all apps that can handle UPI payments
            val resolveInfoList = packageManager.queryIntentActivities(upiIntent, PackageManager.MATCH_DEFAULT_ONLY)
            val upiApps: WritableArray = Arguments.createArray()

            // Iterate through each UPI app and collect its details
            for (resolveInfo in resolveInfoList) {
                val packageName = resolveInfo.activityInfo.packageName
                val appInfo = packageManager.getApplicationInfo(packageName, 0)
                val appName = packageManager.getApplicationLabel(appInfo).toString()
                
                // Get and convert the app icon to base64
                val drawable = packageManager.getApplicationIcon(packageName)
                val base64Icon = imageConverter.convertDrawableToBase64(drawable)
                
                // Create a map of app details
                val appDetails: WritableMap = Arguments.createMap()
                appDetails.putString("packageName", packageName)
                appDetails.putString("appName", appName)
                appDetails.putString("appIcon", base64Icon)
                
                upiApps.pushMap(appDetails)
            }
            
            // Return the array of UPI apps to React Native
            promise.resolve(upiApps)
        } catch (e: ImageConversionException) {
            // Handle specific image conversion errors
            promise.reject("IMAGE_CONVERSION_ERROR", e.message, e)
        } catch (e: Exception) {
            // Handle any other unexpected errors
            promise.reject("ERROR", e.message ?: "Unknown error occurred", e)
        }
    }

    @ReactMethod
    fun initiateUPIPayment(packageName: String, upiId: String, amount: String, note: String, promise: Promise) {
        try {
            val paymentUri = Uri.parse("upi://pay").buildUpon()
                .appendQueryParameter("pa", upiId) // payee address
                .appendQueryParameter("pn", "Saad Siddiqui") // payee name
                .appendQueryParameter("am", amount) // amount
                .appendQueryParameter("cu", "INR") // currency
                .appendQueryParameter("tn", if (note.isNotEmpty()) note else "Payment via React Native") // transaction note
                .build()

            val intent = Intent(Intent.ACTION_VIEW)
            intent.data = paymentUri
            intent.setPackage(packageName)

            // Check if the app can handle this intent
            if (intent.resolveActivity(reactApplicationContext.packageManager) != null) {
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                reactApplicationContext.startActivity(intent)
                promise.resolve(true)
            } else {
                promise.reject("APP_NOT_FOUND", "Selected UPI app cannot handle the payment")
            }
        } catch (e: Exception) {
            promise.reject("PAYMENT_ERROR", e.message ?: "Failed to initiate payment", e)
        }
    }
} 