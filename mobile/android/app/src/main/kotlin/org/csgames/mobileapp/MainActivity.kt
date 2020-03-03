package org.csgames.mobileapp

import android.content.Context
import android.content.Intent
import android.nfc.NfcAdapter
import android.nfc.NfcManager
import android.nfc.Tag
import android.os.Bundle
import io.flutter.app.FlutterActivity
import io.flutter.plugin.common.MethodChannel
import io.flutter.plugins.GeneratedPluginRegistrant

class MainActivity() : FlutterActivity() {
    private val CHANNEL = "app.csgames.org/nfc"
    private val CHARS = arrayOf('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f')

    private lateinit var nfcDevice: NfcAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        GeneratedPluginRegistrant.registerWith(this)
        val nfcManager = applicationContext.getSystemService(Context.NFC_SERVICE) as NfcManager
        nfcDevice = nfcManager.defaultAdapter
    }

    override fun onResume() {
        super.onResume()
        if (nfcDevice != null) {
            val intent = Intent(this, MainActivity::class.java)
            nfcDevice.enableReaderMode(
                    this,
                    { tag: Tag? ->
                        if (tag != null) {
                            handleNfcScan(bytesToHexString(tag.id))
                        }
                    },
                    NfcAdapter.FLAG_READER_NFC_A
                            or NfcAdapter.FLAG_READER_NFC_B
                            or NfcAdapter.FLAG_READER_NFC_F
                            or NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK
                            or NfcAdapter.FLAG_READER_NFC_V,
                    null
            )
        }
    }

    override fun onPause() {
        super.onPause()
        nfcDevice.disableForegroundDispatch(this)
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        var tag = intent?.getParcelableExtra<Tag>(NfcAdapter.EXTRA_TAG)
        if (tag != null) {
            handleNfcScan(bytesToHexString(tag.id))
        }
    }

    fun byteToHexString(src: Byte): String {
        val i = src.toInt()
        val char2 = CHARS[i and 0x0f]
        val char1 = CHARS[i shr 4 and 0x0f]
        return "$char1$char2"
    }

    private fun bytesToHexString(src: ByteArray): String {
        val builder = StringBuilder()
        for (b in src) {
            builder.append(byteToHexString(b))
        }
        return builder.toString()
    }

    private fun handleNfcScan(id: String) {
        runOnUiThread {
            MethodChannel(flutterView, CHANNEL).invokeMethod("newNfcTagScanned", id)
        }
    }
}
