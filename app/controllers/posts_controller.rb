class PostsController < ApplicationController
  def index
    # メモを降順で表示
    @posts = Post.order(id: "DESC")
  end

  # def new
  # end

  def create
    # 新たに投稿されたメモの内容を変数postに格納
    post = Post.create(content: params[:content])
    # renderメソッドとは、呼び出すテンプレート（ビュー）ファイルを指定するメソッド
    # json:の部分をjsonオプションといい、これを指定することによって、
    # 直後に記述した{ post: post }というデータをJSON形式で返却
    # 12行目で定義した変数postの値を、postというキーとセットでJavaScriptに送信
    render json:{ post: post }
  end
end