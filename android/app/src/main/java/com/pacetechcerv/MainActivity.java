package com.pacetechcerv;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.widget.VideoView;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    SplashScreen.show(this);  // here
//    setContentView(R.layout.launch_screen);
//    VideoView view = (VideoView)findViewById(R.id.videoView);
//    view.setVideoPath("android.resource://"+getPackageName()+"/"+R.raw.cervsplash);
//    view.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
//      @Override
//      public void onCompletion(MediaPlayer mp) {
//        if(isFinishing()) return;
//      }
//    });
//    view.start();
  }

  @Override
  protected String getMainComponentName() {
    return "pacetechcerv";
  }
}
