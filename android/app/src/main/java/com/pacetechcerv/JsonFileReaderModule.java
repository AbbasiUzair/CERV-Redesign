package com.pacetechcerv;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.AsyncTask;
import android.os.Environment;
import android.util.JsonReader;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;


import static android.util.JsonToken.NULL;

public class JsonFileReaderModule extends ReactContextBaseJavaModule {

    private ProgressDialog dialog;
    File jsonFileChildData;
    Boolean isJsonFileLoaded;
    String message;


    //constructor
    public JsonFileReaderModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    //Mandatory function getName that specifies the module name
    @Override
    public String getName() {
        return "JsonFileReader";
    }
    //Custom function that we are going to export to JS
    @ReactMethod
    public void jsonFileToSqlite(Callback cb) {
        //android.widget.Toast.makeText(, "Ok i am here", Toast.LENGTH_SHORT).show();
        try{
            File storageDir = getReactApplicationContext().getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
//          String fileName = storageDir + "/" + "downloadChildrenDataFromServer.json";
            String fileName = "/data/user/0/com.pacetechcerv/files/Download/" + "downloadChildrenDataFromServer.json";
            jsonFileChildData = new File(fileName);
            if (jsonFileChildData.exists()) {
                message="file found";
                new LoadChildDataFromJson(getCurrentActivity()).execute();
            } else {
                message="file not found";
            }
            cb.invoke(null, message);
        }catch (Exception e){
            cb.invoke(e.toString(), null);
        }
    }


    @ReactMethod
    public class LoadChildDataFromJson extends AsyncTask<String, String, String> {

        public LoadChildDataFromJson(Activity activity) {
            //set context variables if required
            dialog = new ProgressDialog(activity);

        }

        @Override
        protected String doInBackground(String... strings) {

            try {
                FileInputStream stream = new FileInputStream(jsonFileChildData);
                JsonReader reader = new JsonReader(new InputStreamReader(stream, "UTF-8"));
                reader.beginObject();
                while (reader.hasNext()) {
                    String name = reader.nextName();
                    if (name.equals("data")) {
                        long res = 0;
                        SQLiteDatabase sqldb;
                        sqldb = SQLiteDatabase.openDatabase("/data/user/0/com.pacetechcerv/databases/cerv.db",null,SQLiteDatabase.OPEN_READWRITE);
                        Log.e("json reader", name + " found and Json reader is starting the reading process...");
                        if(sqldb.isOpen()){
                            Log.e("sqlite","db has been found and opened");
                        }
                        else{
                            Log.e("sqlite","db could not be asseessed");
                        }
                        int dataLength = 0;
                        reader.beginArray();
                        try{
                        sqldb.beginTransaction();
                        while (reader.hasNext()) {
                            reader.beginArray();
                    //        isJsonFileLoaded = mydb.insertChildDataFromJsonFile2(reader);
                                while (reader.hasNext()){
                                    ContentValues cv = new ContentValues();
                                    reader.beginObject();
                                    while (reader.hasNext()){
                                        String name_key = reader.nextName();
                                        String value =null;
                                        if(reader.peek() != NULL) {
                                            value = reader.nextString();
                                        } else{
                                            reader.nextNull();
                                        }
                                        cv.put(name_key, value);
                                    }
                                    reader.endObject();
                                    cv.put("issynced", "1");
                                    res = sqldb.replace("cerv_child_registration", null, cv);
                                }

                            reader.endArray();
                            dataLength++;
                        }
                            sqldb.setTransactionSuccessful();
                        } catch (IOException e) {
                            e.printStackTrace();
                            Log.e("Sqlite Error", e.toString());
                        } finally {
                            sqldb.endTransaction();
                        }
                        if (res != -1) {
                    //        backgroundToast(getCurrentActivity(), "Child File Loaded Successfully");
                            message="Child File Loaded Successfully";
                        } else {
                    //        backgroundToast(getCurrentActivity(), "Child File not Loaded Successfully");
                            message="Child File not Loaded Successfully";
                        }
                        reader.endArray();
                        Log.e("json reader", "data array has " + dataLength + " json objects");
                    } else {
                        reader.skipValue();
                    }
                }
                reader.endObject();
                reader.close();
            } catch (FileNotFoundException | UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return null;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog.setTitle("Loading child data from json file");
            dialog.setMessage("Please Wait...");
            dialog.setCancelable(false);
            dialog.setIndeterminate(false);
            dialog.show();
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            dialog.dismiss();
            Intent intent = getCurrentActivity().getIntent();
            getCurrentActivity().finish();
            getCurrentActivity().startActivity(intent);

        }
    }

}
