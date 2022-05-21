<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File; 
use App\Avatars;

class AvatarsController extends Controller
{
    public function changeUserAvatar(Request $request) {
        if($request->file('user_img')) {            
            $file_name = time().'_'.$request->file('user_img')->getClientOriginalName();
            $file_path = $request->file('user_img')->storeAs('uploads', $file_name, 'public');
            $avatars = Avatars::where('user_id',$request->user_id)->get();
            if(count($avatars) > 0)
            {
                Avatars::where('user_id',$request->user_id)->update([
                    'name' => time().'_'.$request->file('user_img')->getClientOriginalName(),
                    'path' => '/storage/' . $file_path
                ]);                                
                if($request->original_img_path) {
                    File::delete($request->original_img_path);
                }
                return Avatars::where('user_id',$request->user_id)->get();
            } else {
                return Avatars::create([
                    'user_id' => $request->user_id,
                    'name' => time().'_'.$request->file('user_img')->getClientOriginalName(),
                    'path' => '/storage/' . $file_path
                ]);
            }
        }

    }
    public function getUserAvatarWithId($id) {
        return Avatars::where('user_id',$id)->pluck('path');
    }
    public function getAllAvatars() {
        return Avatars::orderBy('id','desc')->get();
    }
}
