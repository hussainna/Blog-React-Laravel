<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

use App\Models\Posts;


class PostController extends Controller
{
    public function insert(Request $request)
    {
   
        $validator=Validator::make($request->all(),[
            'category'=>'required|max:191',
            'name'=>'required|max:191',
            'description'=>'required|max:191',

            'image'=>'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages(),
            ]);
        }
        else
        {
            $post=new Posts();
           $post->name=$request->input('name');
           $post->description=$request->input('description');
           $post->category=$request->input('category');

           $user_id=auth('sanctum')->user()->id;

           $post->user_id=$user_id;

           if($request->hasFile('image'))
            {
                $file=$request->file('image');
                $extension=$file->getClientOriginalExtension();
                $filename=time().'.'.$extension;
                $file->move('uploads/posts/',$filename);
                $post->image='uploads/posts/'.$filename;
            }
          $post->save();
          return response()->json([
            'status'=>200,
            'message'=>'the post successfully added'
          ]);
          }
        
    }

    public function index()
    {
        $post=Posts::all();

        return response()->json([
            'status'=>200,
            'post'=>$post,
        ]);

    }

    public function search($id)
    {
        if($id)
        {
            $post=Posts::where('category','LIKE','%'.$id.'%')->get();
            return response()->json([
                'status'=>200,
                'post'=>$post,
            ]);

        }
        else
        {
            $post=Posts::all();

            return response()->json([
                'status'=>200,
                'post'=>$post,
            ]);
        }
        
    }

    public function userPosts()
    {
        $user_id=auth('sanctum')->user()->id;
        $post=Posts::where('user_id',$user_id)->get();
        return response()->json([
            'status'=>200,
            'post'=>$post,
        ]);
    }
}
