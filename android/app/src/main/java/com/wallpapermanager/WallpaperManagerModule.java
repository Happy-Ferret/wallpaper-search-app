package com.wallpapermanager;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.WallpaperManager;
import java.io.InputStream;
import java.net.URL;

public class WallpaperManagerModule extends ReactContextBaseJavaModule {
  private ReactApplicationContext context;

  public WallpaperManagerModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "WallpaperManagerModule";
  }

  @ReactMethod
  public void setNewWallpaperFromUrl(String path) {
      context = getReactApplicationContext();
      WallpaperManager wpm = WallpaperManager.getInstance(context);
      try{
        InputStream ins = new URL(path).openStream();
        wpm.setStream(ins);
      }catch(Exception ex){}
  }
}