package com.helloworld;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.WallpaperManager;
import java.io.InputStream;
import java.net.URL;


public class MyModule extends ReactContextBaseJavaModule {
  private ReactApplicationContext context;

  public MyModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "MyModule";
  }

  @ReactMethod
  public void alert(String path) {
      context = getReactApplicationContext();
      WallpaperManager wpm = WallpaperManager.getInstance(context);
      try{
        InputStream ins = new URL(path).openStream();
        wpm.setStream(ins);
      }catch(Exception ex){}

    //Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_LONG).show();
  }
}